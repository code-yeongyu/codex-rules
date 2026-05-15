import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { type CodexPostToolUseLike, extractCodexToolPaths } from "../src/tool-paths.js";

const tempDirectories: string[] = [];

afterEach(() => {
	for (const directory of tempDirectories.splice(0)) {
		rmSync(directory, { recursive: true, force: true });
	}
});

function makeProject(): string {
	const root = mkdtempSync(path.join(tmpdir(), "codex-rules-paths-"));
	tempDirectories.push(root);
	mkdirSync(path.join(root, "src"), { recursive: true });
	writeFileSync(path.join(root, "src", "app.ts"), "export const app = true;\n");
	return root;
}

function postToolUse(input: { toolName: string; toolInput?: unknown; toolResponse?: unknown }): CodexPostToolUseLike {
	return {
		tool_name: input.toolName,
		tool_input: input.toolInput ?? {},
		tool_response: input.toolResponse ?? { text: "ok" },
	};
}

describe("extractCodexToolPaths", () => {
	it("#given filesystem read payload #when extracting #then returns resolved path", () => {
		// given
		const root = makeProject();

		// when
		const paths = extractCodexToolPaths(
			postToolUse({
				toolName: "mcp__filesystem__read_file",
				toolInput: { path: "src/app.ts" },
			}),
			root,
		);

		// then
		expect(paths).toEqual([path.join(root, "src", "app.ts")]);
	});

	it("#given apply_patch payload #when extracting #then returns patched file paths", () => {
		// given
		const root = makeProject();

		// when
		const paths = extractCodexToolPaths(
			postToolUse({
				toolName: "apply_patch",
				toolInput: {
					command: [
						"*** Begin Patch",
						"*** Update File: src/app.ts",
						"@@",
						"+export const changed = true;",
						"*** End Patch",
					].join("\n"),
				},
			}),
			root,
		);

		// then
		expect(paths).toEqual([path.join(root, "src", "app.ts")]);
	});

	it("#given shell command payload #when extracting #then returns only existing file tokens", () => {
		// given
		const root = makeProject();

		// when
		const paths = extractCodexToolPaths(
			postToolUse({
				toolName: "exec_command",
				toolInput: { cmd: "sed -n '1,80p' src/app.ts src/missing.ts", workdir: root },
			}),
			"/tmp",
		);

		// then
		expect(paths).toEqual([path.join(root, "src", "app.ts")]);
	});

	it("#given failed tracked tool payload #when extracting #then returns no paths", () => {
		// given
		const root = makeProject();

		// when
		const paths = extractCodexToolPaths(
			postToolUse({
				toolName: "read",
				toolInput: { path: "src/app.ts" },
				toolResponse: { is_error: true },
			}),
			root,
		);

		// then
		expect(paths).toEqual([]);
	});
});
