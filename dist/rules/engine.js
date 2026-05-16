import { realpathSync } from "node:fs";
import { basename, dirname, isAbsolute, join, relative, resolve } from "node:path";
import { clearSession, createSessionState, isDynamicInjected as isDynamicInjectedInState, isStaticInjected as isStaticInjectedInState, markDynamicInjected as markDynamicInjectedInState, markStaticInjected as markStaticInjectedInState, } from "./cache.js";
import { DEFAULT_MAX_RESULT_CHARS, DEFAULT_MAX_RULE_CHARS, PROJECT_SINGLE_FILES, SOURCE_PRIORITY, } from "./constants.js";
import { createRuleDiscoveryCache } from "./finder.js";
import { formatDynamicBlock, formatStaticBlock } from "./formatter.js";
import { hashContent, matchRule } from "./matcher.js";
import { sortCandidates } from "./ordering.js";
import { parseRule } from "./parser.js";
const ROOT_SINGLE_FILE_SOURCES = new Set(PROJECT_SINGLE_FILES.filter((source) => !source.includes("/")));
export function defaultConfig() {
    return {
        disabled: false,
        mode: "both",
        maxRuleChars: DEFAULT_MAX_RULE_CHARS,
        maxResultChars: DEFAULT_MAX_RESULT_CHARS,
        enabledSources: "auto",
    };
}
export function createEngine(config, deps) {
    const state = createSessionState();
    function loadStaticRules(cwd) {
        state.cwd = cwd;
        if (config.disabled || config.mode === "off" || config.mode === "dynamic") {
            return emptyLoadResult(state);
        }
        const projectRoot = deps.findProjectRoot(cwd);
        const candidates = deps.findCandidates({
            projectRoot,
            targetFile: null,
            disabledSources: disabledSourcesFor(config),
        });
        const result = loadStaticCandidates(candidates, deps, projectRoot);
        storeLastLoad(state, result.rules, result.diagnostics);
        return result;
    }
    function loadDynamicRules(cwd, targetPaths) {
        state.cwd = cwd;
        if (config.disabled || config.mode === "off" || config.mode === "static" || targetPaths.length === 0) {
            return emptyLoadResult(state);
        }
        const rules = [];
        const diagnostics = [];
        const seenRules = new Set();
        const loadedRuleContent = new Map();
        const projectMembership = new Map();
        const disabledSources = disabledSourcesFor(config);
        const discoveryCache = createRuleDiscoveryCache();
        const cwdProjectRoot = deps.findProjectRoot(cwd);
        for (const targetFile of uniqueStrings(targetPaths)) {
            const projectRoot = cwdProjectRoot !== null && isSameOrChildPath(targetFile, cwdProjectRoot)
                ? cwdProjectRoot
                : deps.findProjectRoot(targetFile);
            const candidates = deps.findCandidates({ projectRoot, targetFile, disabledSources, cache: discoveryCache });
            for (const candidate of sortCandidates(candidates)) {
                const loadedRule = loadCandidate(candidate, deps, diagnostics, projectRoot, loadedRuleContent, projectMembership);
                if (loadedRule === null) {
                    continue;
                }
                const matchResult = matchRule({
                    frontmatter: loadedRule.frontmatter,
                    isSingleFile: candidate.isSingleFile,
                    pathBases: pathBasesForTarget(projectRoot, targetFile, candidate),
                });
                if (!matchResult.matched) {
                    continue;
                }
                const dedupKey = ruleDedupKey(loadedRule);
                if (seenRules.has(dedupKey)) {
                    continue;
                }
                seenRules.add(dedupKey);
                rules.push({ ...loadedRule, matchReason: matchResult.reason });
            }
        }
        const sortedRules = sortCandidates(rules);
        storeLastLoad(state, sortedRules, diagnostics);
        return { rules: sortedRules, diagnostics };
    }
    return {
        state,
        config,
        loadStaticRules,
        loadDynamicRules,
        formatStatic: (rules) => formatStaticBlock(rules, { maxRuleChars: config.maxRuleChars, maxResultChars: config.maxResultChars }),
        formatDynamic: (rules, target) => formatDynamicBlock(rules, target, {
            maxRuleChars: config.maxRuleChars,
            maxResultChars: config.maxResultChars,
        }),
        resetSession: (cwd) => {
            clearSession(state);
            if (cwd !== undefined) {
                state.cwd = cwd;
            }
        },
        isStaticInjected: (rule) => isStaticInjectedInState(state, rule),
        isDynamicInjected: (rule) => isDynamicInjectedInState(state, rule),
        markStaticInjected: (rule) => markStaticInjectedInState(state, rule),
        markDynamicInjected: (rule) => markDynamicInjectedInState(state, rule),
    };
}
function loadStaticCandidates(candidates, deps, projectRoot) {
    const rules = [];
    const diagnostics = [];
    let rootSingleFileSelected = false;
    for (const candidate of sortCandidates(candidates)) {
        if (isDedupedRootSingleFile(candidate, rootSingleFileSelected)) {
            continue;
        }
        const loadedRule = loadCandidate(candidate, deps, diagnostics, projectRoot);
        if (loadedRule === null) {
            continue;
        }
        const matchReason = staticMatchReason(loadedRule);
        if (matchReason === null) {
            continue;
        }
        if (isRootSingleFile(candidate)) {
            rootSingleFileSelected = true;
        }
        rules.push({ ...loadedRule, matchReason });
    }
    return { rules: sortCandidates(rules), diagnostics };
}
function loadCandidate(candidate, deps, diagnostics, projectRoot, loadedRuleContent, projectMembership) {
    if (!isCandidateWithinProjectCached(candidate, projectRoot, projectMembership)) {
        diagnostics.push({
            severity: "warning",
            source: candidate.path,
            message: "Rule file resolves outside project root",
        });
        return null;
    }
    const cachedContent = loadedRuleContent?.get(candidate.realPath);
    if (cachedContent !== undefined) {
        return loadedRuleFromContent(candidate, cachedContent, diagnostics);
    }
    const content = deps.readFile(candidate.path);
    if (content === null) {
        loadedRuleContent?.set(candidate.realPath, null);
        diagnostics.push({ severity: "warning", source: candidate.path, message: "Unable to read rule file" });
        return null;
    }
    const parsed = parseRule(content);
    const loadedContent = {
        frontmatter: parsed.frontmatter,
        body: parsed.body,
        contentHash: hashContent(parsed.body),
        diagnostic: parsed.diagnostic,
    };
    loadedRuleContent?.set(candidate.realPath, loadedContent);
    return loadedRuleFromContent(candidate, loadedContent, diagnostics);
}
function loadedRuleFromContent(candidate, content, diagnostics) {
    if (content === null) {
        diagnostics.push({ severity: "warning", source: candidate.path, message: "Unable to read rule file" });
        return null;
    }
    if (content.diagnostic !== undefined) {
        diagnostics.push({ severity: "warning", source: candidate.path, message: content.diagnostic });
    }
    return {
        ...candidate,
        frontmatter: content.frontmatter,
        body: content.body,
        contentHash: content.contentHash,
        matchReason: { kind: "no-match" },
    };
}
function ruleDedupKey(rule) {
    return `${rule.realPath}::${rule.contentHash}`;
}
function isCandidateWithinProject(candidate, projectRoot) {
    if (candidate.isGlobal) {
        return true;
    }
    if (projectRoot === null) {
        return false;
    }
    const relativeRealPath = relative(realPathOrResolved(projectRoot), realPathOrResolved(candidate.realPath));
    return relativeRealPath === "" || (!relativeRealPath.startsWith("..") && !isAbsolute(relativeRealPath));
}
function isCandidateWithinProjectCached(candidate, projectRoot, projectMembership) {
    if (projectMembership === undefined) {
        return isCandidateWithinProject(candidate, projectRoot);
    }
    const cacheKey = `${projectRoot ?? ""}\0${candidate.realPath}`;
    const cached = projectMembership.get(cacheKey);
    if (cached !== undefined) {
        return cached;
    }
    const isWithinProject = isCandidateWithinProject(candidate, projectRoot);
    projectMembership.set(cacheKey, isWithinProject);
    return isWithinProject;
}
function realPathOrResolved(path) {
    try {
        return realpathSync.native(path);
    }
    catch {
        return resolve(path);
    }
}
function isSameOrChildPath(childPath, parentPath) {
    const childRelativePath = relative(parentPath, resolve(childPath));
    return childRelativePath === "" || (!childRelativePath.startsWith("..") && !isAbsolute(childRelativePath));
}
function staticMatchReason(rule) {
    if (rule.frontmatter.alwaysApply === true) {
        return "alwaysApply";
    }
    if (rule.isSingleFile) {
        return "single-file";
    }
    return null;
}
function disabledSourcesFor(config) {
    if (config.enabledSources === "auto") {
        return undefined;
    }
    const enabledSources = new Set(config.enabledSources);
    return new Set([...SOURCE_PRIORITY.keys()].filter((source) => !enabledSources.has(source)));
}
function isDedupedRootSingleFile(candidate, rootSingleFileSelected) {
    return rootSingleFileSelected && isRootSingleFile(candidate);
}
function isRootSingleFile(candidate) {
    return candidate.distance === 0 && candidate.isSingleFile && ROOT_SINGLE_FILE_SOURCES.has(candidate.source);
}
function pathBasesForTarget(projectRoot, targetFile, candidate) {
    const targetBasename = basename(targetFile);
    if (projectRoot === null) {
        return { projectRelative: targetBasename, basename: targetBasename };
    }
    const projectRelative = toPosixPath(relative(projectRoot, targetFile));
    const scopeDirectory = scopeDirectoryForCandidate(projectRoot, candidate);
    if (scopeDirectory === null) {
        return { projectRelative, basename: targetBasename };
    }
    return {
        projectRelative,
        scopeRelative: toPosixPath(relative(scopeDirectory, targetFile)),
        basename: targetBasename,
    };
}
function scopeDirectoryForCandidate(projectRoot, candidate) {
    if (candidate.isGlobal) {
        return null;
    }
    if (candidate.isSingleFile) {
        return dirname(candidate.path);
    }
    const sourceIndex = candidate.relativePath.indexOf(candidate.source);
    if (sourceIndex === -1) {
        return projectRoot;
    }
    const scopeRelativeDirectory = candidate.relativePath.slice(0, sourceIndex).replace(/\/$/, "");
    return scopeRelativeDirectory.length === 0 ? projectRoot : join(projectRoot, scopeRelativeDirectory);
}
function toPosixPath(path) {
    return path.replaceAll("\\", "/");
}
function storeLastLoad(state, rules, diagnostics) {
    state.loadedRules.length = 0;
    state.loadedRules.push(...rules);
    state.diagnostics.length = 0;
    state.diagnostics.push(...diagnostics);
}
function emptyLoadResult(state) {
    storeLastLoad(state, [], []);
    return { rules: [], diagnostics: [] };
}
function uniqueStrings(values) {
    const uniqueValues = [];
    const seenValues = new Set();
    for (const value of values) {
        if (seenValues.has(value)) {
            continue;
        }
        seenValues.add(value);
        uniqueValues.push(value);
    }
    return uniqueValues;
}
//# sourceMappingURL=engine.js.map