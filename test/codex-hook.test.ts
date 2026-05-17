import { spawn } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import {
	type CodexPostToolUseInput,
	type CodexSessionStartInput,
	runPostToolUseHook,
	runSessionStartHook,
	runUserPromptSubmitHook,
} from "../src/codex-hook.js";

type CliResult = {
	exitCode: number | null;
	stdout: string;
	stderr: string;
};

function runHookCli(input: string): Promise<CliResult> {
	return new Promise((resolve, reject) => {
		const child = spawn(
			process.execPath,
			[new URL("../dist/cli.js", import.meta.url).pathname, "hook", "post-tool-use"],
			{
				stdio: ["pipe", "pipe", "pipe"],
			},
		);
		let stdout = "";
		let stderr = "";
		child.stdout.setEncoding("utf8");
		child.stderr.setEncoding("utf8");
		child.stdout.on("data", (chunk: string) => {
			stdout += chunk;
		});
		child.stderr.on("data", (chunk: string) => {
			stderr += chunk;
		});
		child.once("error", reject);
		child.once("close", (exitCode) => {
			resolve({ exitCode, stdout, stderr });
		});
		child.stdin.end(input);
	});
}

const tempDirectories: string[] = [];
const PROJECT_ONLY_ENV = {
	CODEX_RULES_ENABLED_SOURCES: "AGENTS.md,.sisyphus/rules",
};

afterEach(() => {
	for (const directory of tempDirectories.splice(0)) {
		rmSync(directory, { recursive: true, force: true });
	}
});

function makeTempProject(): { root: string; pluginData: string } {
	const root = mkdtempSync(path.join(tmpdir(), "codex-rules-project-"));
	const pluginData = mkdtempSync(path.join(tmpdir(), "codex-rules-data-"));
	tempDirectories.push(root, pluginData);
	writeFileSync(path.join(root, "package.json"), JSON.stringify({ name: "fixture" }));
	writeFileSync(path.join(root, "AGENTS.md"), "Always wear safety goggles when refactoring.");
	mkdirSync(path.join(root, ".sisyphus", "rules"), { recursive: true });
	writeFileSync(
		path.join(root, ".sisyphus", "rules", "typescript.md"),
		[
			"---",
			"description: TypeScript",
			'globs: ["**/*.ts", "**/*.tsx"]',
			"---",
			"",
			"Prefer strict TypeScript for all source files.",
		].join("\n"),
	);
	mkdirSync(path.join(root, "src"), { recursive: true });
	writeFileSync(path.join(root, "src", "app.ts"), "export const app = true;\n");
	writeFileSync(path.join(root, "src", "other.ts"), "export const other = true;\n");
	return { root, pluginData };
}

function sessionStartInput(root: string): CodexSessionStartInput {
	return {
		session_id: "session-1",
		transcript_path: null,
		cwd: root,
		hook_event_name: "SessionStart",
		model: "gpt-5.5",
		permission_mode: "default",
		source: "startup",
	};
}

function postToolUseInput(root: string, filePath: string): CodexPostToolUseInput {
	return {
		session_id: "session-1",
		turn_id: "turn-1",
		transcript_path: null,
		cwd: root,
		hook_event_name: "PostToolUse",
		model: "gpt-5.5",
		permission_mode: "default",
		tool_name: "mcp__filesystem__read_file",
		tool_input: { path: filePath },
		tool_response: { text: "file contents" },
		tool_use_id: "call-1",
	};
}

function parseHookOutput(output: string): {
	hookSpecificOutput?: {
		hookEventName?: string;
		additionalContext?: string;
	};
} {
	expect(output.trim().length).toBeGreaterThan(0);
	return JSON.parse(output) as {
		hookSpecificOutput?: {
			hookEventName?: string;
			additionalContext?: string;
		};
	};
}

function occurrenceCount(value: string, search: string): number {
	return value.split(search).length - 1;
}

describe("codex rules hooks", () => {
	it("#given project rules #when SessionStart runs #then emits static additional context", async () => {
		// given
		const { root, pluginData } = makeTempProject();

		// when
		const output = await runSessionStartHook(sessionStartInput(root), {
			pluginDataRoot: pluginData,
			env: PROJECT_ONLY_ENV,
		});

		// then
		const parsed = parseHookOutput(output);
		expect(parsed.hookSpecificOutput?.hookEventName).toBe("SessionStart");
		expect(parsed.hookSpecificOutput?.additionalContext).toContain("## Project Instructions");
		expect(parsed.hookSpecificOutput?.additionalContext).toContain("Always wear safety goggles");
	});

	it("#given static context already injected #when UserPromptSubmit runs #then it emits no duplicate context", async () => {
		// given
		const { root, pluginData } = makeTempProject();
		await runSessionStartHook(sessionStartInput(root), { pluginDataRoot: pluginData, env: PROJECT_ONLY_ENV });

		// when
		const output = await runUserPromptSubmitHook(
			{
				session_id: "session-1",
				turn_id: "turn-1",
				transcript_path: null,
				cwd: root,
				hook_event_name: "UserPromptSubmit",
				model: "gpt-5.5",
				permission_mode: "default",
				prompt: "read src/app.ts",
			},
			{ pluginDataRoot: pluginData, env: PROJECT_ONLY_ENV },
		);

		// then
		expect(output).toBe("");
	});

	it("#given read-file tool result #when PostToolUse runs #then emits matching dynamic rule context", async () => {
		// given
		const { root, pluginData } = makeTempProject();
		const filePath = path.join(root, "src", "app.ts");

		// when
		const output = await runPostToolUseHook(postToolUseInput(root, filePath), {
			pluginDataRoot: pluginData,
			env: PROJECT_ONLY_ENV,
		});

		// then
		// The literal "src/app.ts" pins POSIX separators and acts as the Windows
		// regression line: prior versions emitted "src\\app.ts" on Windows.
		const parsed = parseHookOutput(output);
		expect(parsed.hookSpecificOutput?.hookEventName).toBe("PostToolUse");
		expect(parsed.hookSpecificOutput?.additionalContext).toContain(
			"Additional project instructions matched for src/app.ts",
		);
		expect(parsed.hookSpecificOutput?.additionalContext).toContain("Prefer strict TypeScript");
		expect(parsed.hookSpecificOutput?.additionalContext ?? "").not.toContain("src\\app.ts");
		expect(output).not.toContain("updatedMCPToolOutput");
		expect(output).not.toContain("suppressOutput");
		expect(output).not.toContain('"decision"');
	});

	it("#given multiple target paths matching one rule #when PostToolUse runs #then emits dynamic context once for the first target", async () => {
		// given
		const { root, pluginData } = makeTempProject();
		const firstFilePath = path.join(root, "src", "app.ts");
		const secondFilePath = path.join(root, "src", "other.ts");

		// when
		const output = await runPostToolUseHook(
			{
				...postToolUseInput(root, firstFilePath),
				tool_name: "mcp__filesystem__read_multiple_files",
				tool_input: { paths: [firstFilePath, secondFilePath, firstFilePath] },
			},
			{
				pluginDataRoot: pluginData,
				env: PROJECT_ONLY_ENV,
			},
		);

		// then
		const parsed = parseHookOutput(output);
		const additionalContext = parsed.hookSpecificOutput?.additionalContext ?? "";
		expect(parsed.hookSpecificOutput?.hookEventName).toBe("PostToolUse");
		expect(additionalContext).toContain("Additional project instructions matched for src/app.ts");
		expect(additionalContext).not.toContain("src\\app.ts");
		expect(occurrenceCount(additionalContext, "Prefer strict TypeScript")).toBe(1);
	});

	it("#given dynamic context already injected #when PostToolUse repeats #then emits no duplicate context", async () => {
		// given
		const { root, pluginData } = makeTempProject();
		const filePath = path.join(root, "src", "app.ts");
		const input = postToolUseInput(root, filePath);
		await runPostToolUseHook(input, { pluginDataRoot: pluginData, env: PROJECT_ONLY_ENV });

		// when
		const output = await runPostToolUseHook(input, { pluginDataRoot: pluginData, env: PROJECT_ONLY_ENV });

		// then
		expect(output).toBe("");
	});

	it("#given static-only mode #when PostToolUse runs #then emits no dynamic context", async () => {
		// given
		const { root, pluginData } = makeTempProject();
		const filePath = path.join(root, "src", "app.ts");

		// when
		const output = await runPostToolUseHook(postToolUseInput(root, filePath), {
			pluginDataRoot: pluginData,
			env: {
				...PROJECT_ONLY_ENV,
				CODEX_RULES_MODE: "static",
			},
		});

		// then
		expect(output).toBe("");
	});

	it("#given rules disabled #when PostToolUse runs #then emits no dynamic context", async () => {
		// given
		const { root, pluginData } = makeTempProject();
		const filePath = path.join(root, "src", "app.ts");

		// when
		const output = await runPostToolUseHook(postToolUseInput(root, filePath), {
			pluginDataRoot: pluginData,
			env: {
				...PROJECT_ONLY_ENV,
				CODEX_RULES_DISABLED: "true",
			},
		});

		// then
		expect(output).toBe("");
	});

	it("#given failed tool response #when PostToolUse runs #then emits no dynamic context", async () => {
		// given
		const { root, pluginData } = makeTempProject();
		const filePath = path.join(root, "src", "app.ts");

		// when
		const output = await runPostToolUseHook(
			{
				...postToolUseInput(root, filePath),
				tool_response: { is_error: true },
			},
			{ pluginDataRoot: pluginData, env: PROJECT_ONLY_ENV },
		);

		// then
		expect(output).toBe("");
	});

	it("#given tracked tool without path #when PostToolUse runs #then emits no dynamic context", async () => {
		// given
		const { root, pluginData } = makeTempProject();

		// when
		const output = await runPostToolUseHook(
			{
				...postToolUseInput(root, ""),
				tool_input: {},
			},
			{ pluginDataRoot: pluginData, env: PROJECT_ONLY_ENV },
		);

		// then
		expect(output).toBe("");
	});

	it("#given malformed post-tool-use stdin #when hook CLI runs #then it no-ops without stderr", async () => {
		// given
		const input = "break;\n";

		// when
		const result = await runHookCli(input);

		// then
		expect(result).toEqual({
			exitCode: 0,
			stdout: "",
			stderr: "",
		});
	});

	it("#given non-object post-tool-use JSON #when hook CLI runs #then it no-ops without stderr", async () => {
		// given
		const input = "[]\n";

		// when
		const result = await runHookCli(input);

		// then
		expect(result).toEqual({
			exitCode: 0,
			stdout: "",
			stderr: "",
		});
	});
});
