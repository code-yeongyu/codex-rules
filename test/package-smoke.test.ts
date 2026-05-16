import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

function readJson(path: string): Record<string, unknown> {
	return JSON.parse(readFileSync(path, "utf8")) as Record<string, unknown>;
}

describe("plugin package metadata", () => {
	it("#given packaged plugin files #when validating entrypoints #then hook commands use portable plugin root interpolation", () => {
		// given
		const packageJson = readJson("package.json");
		const pluginJson = readJson(".codex-plugin/plugin.json");
		const hooksJson = readJson("hooks/hooks.json");
		const cliSource = readFileSync("src/cli.ts", "utf8");

		// when
		const bin = packageJson.bin as Record<string, unknown>;
		const dependencies = packageJson.dependencies as Record<string, unknown> | undefined;
		const hookConfig = hooksJson.hooks as Record<string, Array<{ hooks: Array<{ command: string }> }>>;
		const pluginRoot = ["$", "{PLUGIN_ROOT}"].join("");
		const commands = [
			hookConfig.SessionStart?.[0]?.hooks[0]?.command,
			hookConfig.UserPromptSubmit?.[0]?.hooks[0]?.command,
			hookConfig.PostToolUse?.[0]?.hooks[0]?.command,
		];

		// then
		expect(packageJson.type).toBe("module");
		expect(packageJson.packageManager).toBe("npm@11.12.1");
		expect(dependencies ?? {}).toEqual({});
		expect(bin["codex-rules"]).toBe("./dist/cli.js");
		expect(pluginJson.hooks).toBe("./hooks/hooks.json");
		expect(cliSource.startsWith("#!/usr/bin/env node")).toBe(true);
		expect(commands).toEqual([
			`node "${pluginRoot}/dist/cli.js" hook session-start`,
			`node "${pluginRoot}/dist/cli.js" hook user-prompt-submit`,
			`node "${pluginRoot}/dist/cli.js" hook post-tool-use`,
		]);
	});
});
