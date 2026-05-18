import { readFileSync } from "node:fs";
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
