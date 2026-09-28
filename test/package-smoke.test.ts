import { spawnSync } from "node:child_process";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

type PackageJson = {
	readonly type: string;
	readonly packageManager: string;
	readonly bin: Record<string, string>;
	readonly dependencies?: Record<string, unknown>;
};

type PluginJson = {
	readonly hooks: string;
};

type HookCommand = {
	readonly command: string;
};

type HookEntry = {
	readonly matcher?: string;
	readonly hooks: readonly HookCommand[];
};

type HooksJson = {
	readonly hooks: Record<string, readonly HookEntry[]>;
};

function readPackageJson(path: string): PackageJson {
	const parsed: unknown = JSON.parse(readFileSync(path, "utf8"));
	if (!isPackageJson(parsed)) throw new TypeError(`Invalid package metadata: ${path}`);
	return parsed;
}

function readPluginJson(path: string): PluginJson {
	const parsed: unknown = JSON.parse(readFileSync(path, "utf8"));
	if (!isPluginJson(parsed)) throw new TypeError(`Invalid plugin metadata: ${path}`);
	return parsed;
}

function readHooksJson(path: string): HooksJson {
	const parsed: unknown = JSON.parse(readFileSync(path, "utf8"));
	if (!isHooksJson(parsed)) throw new TypeError(`Invalid hooks metadata: ${path}`);
	return parsed;
}

describe("plugin package metadata", () => {
	it("#given packaged plugin files #when validating entrypoints #then hook commands use portable plugin root interpolation", () => {
		// given
		const packageJson = readPackageJson("package.json");
		const pluginJson = readPluginJson(".codex-plugin/plugin.json");
		const hooksJson = readHooksJson("hooks/hooks.json");
		const cliSource = readFileSync("src/cli.ts", "utf8");

		// when
		const hookConfig = hooksJson.hooks;
		const pluginRoot = ["$", "{PLUGIN_ROOT}"].join("");
		const commands = [
			hookConfig["SessionStart"]?.[0]?.hooks[0]?.command,
			hookConfig["UserPromptSubmit"]?.[0]?.hooks[0]?.command,
			hookConfig["PostToolUse"]?.[0]?.hooks[0]?.command,
			hookConfig["PostCompact"]?.[0]?.hooks[0]?.command,
		];
		const postToolUseMatcher = hookConfig["PostToolUse"]?.[0]?.matcher ?? "";

		// then
		expect(packageJson.type).toBe("module");
		expect(packageJson.packageManager).toBe("npm@11.12.1");
		expect(packageJson.dependencies ?? {}).toEqual({ picomatch: "^4.0.3" });
		expect(packageJson.bin["codex-rules"]).toBe("./dist/cli.js");
		expect(pluginJson.hooks).toBe("./hooks/hooks.json");
		expect(cliSource.startsWith("#!/usr/bin/env node")).toBe(true);
		expect(commands).toEqual([
			`node "${pluginRoot}/dist/cli.js" hook session-start`,
			`node "${pluginRoot}/dist/cli.js" hook user-prompt-submit`,
			`node "${pluginRoot}/dist/cli.js" hook post-tool-use`,
			`node "${pluginRoot}/dist/cli.js" hook post-compact`,
		]);
		expect(postToolUseMatcher).toBe("^apply_patch$");
		const postToolUseMatcherRegex = new RegExp(postToolUseMatcher);
		expect(postToolUseMatcherRegex.test("apply_patch")).toBe(true);
		expect(
			[
				"read",
				"Read",
				"read_file",
				"mcp__filesystem__read_file",
				"mcp__filesystem__read_multiple_files",
				"mcp__filesystem__write_file",
				"mcp__filesystem__edit_file",
				"write",
				"Write",
				"edit",
				"Edit",
				"multi_edit",
				"MultiEdit",
				"multiedit",
				"exec_command",
				"shell_command",
				"bash",
				"Bash",
			].some((toolName) => postToolUseMatcherRegex.test(toolName)),
		).toBe(false);
	});
});

describe("standalone plugin hooks", () => {
	it.each([
		["session-start", "SessionStart", "Follow project conventions."],
		["user-prompt-submit", "UserPromptSubmit", "Follow project conventions."],
		["post-tool-use", "PostToolUse", "Use strict TypeScript."],
	])("#given no node_modules #when %s runs #then it injects matching rules", (command, event, rule) => {
		// given: copy the distributed files outside the checkout's dependency tree.
		const root = mkdtempSync(join(tmpdir(), "codex-rules-standalone-"));
		try {
			const pluginRoot = join(root, "plugin");
			const projectRoot = join(root, "project");
			cpSync("dist", join(pluginRoot, "dist"), { recursive: true });
			cpSync("package.json", join(pluginRoot, "package.json"));
			mkdirSync(join(projectRoot, ".omo", "rules"), { recursive: true });
			mkdirSync(join(projectRoot, "src"));
			writeFileSync(join(projectRoot, "package.json"), '{"name":"fixture"}');
			writeFileSync(join(projectRoot, "AGENTS.md"), "Follow project conventions.");
			writeFileSync(join(projectRoot, "src", "app.ts"), "export const app = true;\n");
			writeFileSync(
				join(projectRoot, ".omo", "rules", "typescript.md"),
				'---\nglobs: ["src/**/*.{ts,tsx}"]\n---\nUse strict TypeScript.',
			);
			const payload = {
				session_id: "standalone",
				turn_id: "turn-1",
				transcript_path: null,
				cwd: projectRoot,
				hook_event_name: event,
				model: "test-model",
				permission_mode: "default",
				source: "startup",
				prompt: "Update src/app.ts",
				tool_name: "apply_patch",
				tool_input: {
					patch: "*** Begin Patch\n*** Update File: src/app.ts\n@@\n-export const app = true;\n+export const app = false;\n*** End Patch",
				},
				tool_response: "Success. Updated src/app.ts",
				tool_use_id: "call-1",
			};

			// when
			const result = spawnSync(process.execPath, [join(pluginRoot, "dist", "cli.js"), "hook", command], {
				cwd: projectRoot,
				input: JSON.stringify(payload),
				encoding: "utf8",
				env: {
					...process.env,
					NODE_PATH: "",
					CODEX_RULES_DISABLED: "0",
					CODEX_RULES_MODE: "both",
					CODEX_RULES_ENABLED_SOURCES: "AGENTS.md,.omo/rules",
					PLUGIN_DATA: join(root, "data"),
				},
				timeout: 10_000,
			});

			// then
			expect(result.error).toBeUndefined();
			expect(result.stderr).toBe("");
			expect(result.status).toBe(0);
			const output: unknown = JSON.parse(result.stdout);
			expect(output).toMatchObject({
				hookSpecificOutput: { hookEventName: event, additionalContext: expect.stringContaining(rule) },
			});
		} finally {
			rmSync(root, { recursive: true, force: true });
		}
	});
});

function isPackageJson(value: unknown): value is PackageJson {
	if (!isRecord(value)) return false;
	const dependencies = value["dependencies"];
	return (
		value["type"] === "module" &&
		value["packageManager"] === "npm@11.12.1" &&
		isStringRecord(value["bin"]) &&
		(dependencies === undefined || isRecord(dependencies))
	);
}

function isPluginJson(value: unknown): value is PluginJson {
	return isRecord(value) && typeof value["hooks"] === "string";
}

function isHooksJson(value: unknown): value is HooksJson {
	if (!isRecord(value) || !isRecord(value["hooks"])) return false;
	return Object.values(value["hooks"]).every(isHookEntries);
}

function isHookEntries(value: unknown): value is readonly HookEntry[] {
	return Array.isArray(value) && value.every(isHookEntry);
}

function isHookEntry(value: unknown): value is HookEntry {
	return isRecord(value) && Array.isArray(value["hooks"]) && value["hooks"].every(isHookCommand);
}

function isHookCommand(value: unknown): value is HookCommand {
	return isRecord(value) && typeof value["command"] === "string";
}

function isStringRecord(value: unknown): value is Record<string, string> {
	return isRecord(value) && Object.values(value).every((item) => typeof item === "string");
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
