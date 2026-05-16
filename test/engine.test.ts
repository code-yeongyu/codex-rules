import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { createEngine, defaultConfig, type EngineDeps } from "../src/rules/engine.js";
import type { RuleCandidate } from "../src/rules/types.js";

describe("rule engine dynamic matching", () => {
	it("#given duplicate target paths #when loading dynamic rules #then repeated discovery and parsing work is avoided", () => {
		// given
		const projectRoot = "/tmp/codex-rules-engine";
		const targetPath = join(projectRoot, "src", "app.ts");
		const candidate: RuleCandidate = {
			path: join(projectRoot, ".sisyphus", "rules", "typescript.md"),
			realPath: join(projectRoot, ".sisyphus", "rules", "typescript.md"),
			source: ".sisyphus/rules",
			distance: 0,
			isGlobal: false,
			isSingleFile: false,
			relativePath: ".sisyphus/rules/typescript.md",
		};
		const counters = {
			findProjectRoot: 0,
			findCandidates: 0,
			readFile: 0,
		};
		const deps = {
			findProjectRoot: () => {
				counters.findProjectRoot += 1;
				return projectRoot;
			},
			findCandidates: () => {
				counters.findCandidates += 1;
				return [candidate];
			},
			readFile: () => {
				counters.readFile += 1;
				return ["---", "globs: **/*.ts", "---", "", "Prefer strict TypeScript."].join("\n");
			},
		} satisfies EngineDeps;
		const engine = createEngine(defaultConfig(), deps);

		// when
		const result = engine.loadDynamicRules(projectRoot, [targetPath, targetPath, targetPath]);

		// then
		expect(result.rules).toHaveLength(1);
		expect(counters).toEqual({
			findProjectRoot: 1,
			findCandidates: 1,
			readFile: 1,
		});
	});
});
