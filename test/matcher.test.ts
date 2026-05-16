import { describe, expect, it } from "vitest";

import { matchRule } from "../src/rules/matcher.js";
import type { RuleFrontmatter } from "../src/rules/types.js";

function matchGlobs(globs: string | string[], projectRelative: string): boolean {
	return matchRule({
		frontmatter: { globs } satisfies RuleFrontmatter,
		isSingleFile: false,
		pathBases: {
			projectRelative,
			basename: projectRelative.split("/").at(-1) ?? projectRelative,
		},
	}).matched;
}

describe("matchRule", () => {
	it("#given recursive glob #when target is nested #then matches without runtime dependencies", () => {
		// given
		const globs = "**/*.ts";

		// when
		const matched = matchGlobs(globs, "src/features/app.ts");

		// then
		expect(matched).toBe(true);
	});

	it("#given negative glob #when target is excluded #then no match is returned", () => {
		// given
		const globs = ["**/*.ts", "!**/*.test.ts"];

		// when
		const matched = matchGlobs(globs, "src/features/app.test.ts");

		// then
		expect(matched).toBe(false);
	});

	it("#given brace glob #when target extension is listed #then matches", () => {
		// given
		const globs = "src/**/*.{ts,tsx}";

		// when
		const matched = matchGlobs(globs, "src/features/app.tsx");

		// then
		expect(matched).toBe(true);
	});
});
