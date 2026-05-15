import { createHash } from "node:crypto";
import picomatch from "picomatch";
export function matchRule(input) {
    if (input.isSingleFile) {
        return { matched: true, reason: "single-file" };
    }
    if (input.frontmatter.alwaysApply === true) {
        return { matched: true, reason: "alwaysApply" };
    }
    const patterns = normalizeGlobs(input.frontmatter);
    if (patterns.length === 0) {
        return noMatch();
    }
    const pathBases = [
        normalizePath(input.pathBases.projectRelative),
        input.pathBases.scopeRelative ? normalizePath(input.pathBases.scopeRelative) : undefined,
        normalizePath(input.pathBases.basename),
    ].filter((pathBase) => pathBase !== undefined);
    const positivePatterns = patterns.filter((pattern) => !pattern.startsWith("!"));
    const negativePatterns = patterns.filter((pattern) => pattern.startsWith("!"));
    const negativeMatchers = negativePatterns.map((pattern) => picomatch(pattern.slice(1), { bash: true, dot: true }));
    for (const pattern of positivePatterns) {
        const isMatch = picomatch(pattern, { bash: true, dot: true });
        for (const pathBase of pathBases) {
            if (!isMatch(pathBase)) {
                continue;
            }
            if (isExcluded(pathBase, negativeMatchers)) {
                return noMatch();
            }
            return { matched: true, reason: { kind: "glob", pattern } };
        }
    }
    return noMatch();
}
export function normalizeGlobs(frontmatter) {
    const patterns = [
        ...normalizePatternList(frontmatter.globs),
        ...normalizePatternList(frontmatter.paths),
        ...normalizePatternList(frontmatter.applyTo),
    ];
    return [...new Set(patterns.map(normalizePath))];
}
export function hashContent(body) {
    return createHash("sha256").update(body).digest("hex");
}
function normalizePatternList(patterns) {
    if (patterns === undefined) {
        return [];
    }
    return Array.isArray(patterns) ? patterns : [patterns];
}
function normalizePath(path) {
    return path.replaceAll("\\", "/");
}
function isExcluded(pathBase, negativeMatchers) {
    for (const isMatch of negativeMatchers) {
        if (isMatch(pathBase)) {
            return true;
        }
    }
    return false;
}
function noMatch() {
    return { matched: false, reason: { kind: "no-match" } };
}
//# sourceMappingURL=matcher.js.map