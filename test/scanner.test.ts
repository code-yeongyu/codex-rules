import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { scanRuleFiles } from "../src/rules/scanner.js";

const tempDirectories: string[] = [];

afterEach(() => {
	for (const directory of tempDirectories.splice(0)) {
		rmSync(directory, { recursive: true, force: true });
	}
});

describe("scanRuleFiles", () => {
	it("#given more rule files than max #when scanning #then returns only capped files", () => {
		// given
		const root = mkdtempSync(join(tmpdir(), "codex-rules-scanner-"));
		tempDirectories.push(root);
		for (let index = 0; index < 5; index += 1) {
			writeFileSync(join(root, `rule-${index}.md`), `Rule ${index}\n`);
		}

		// when
		const files = scanRuleFiles({ rootDir: root, maxFiles: 2 });

		// then
		expect(files).toHaveLength(2);
	});
});
