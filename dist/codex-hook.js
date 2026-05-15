import { readFileSync } from "node:fs";
import { isAbsolute, relative } from "node:path";
import { configFromEnvironment } from "./config.js";
import { clearSessionState, hydrateEngineState, persistEngineState, sessionCachePath } from "./persistent-cache.js";
import { createEngine } from "./rules/engine.js";
import { findRuleCandidates } from "./rules/finder.js";
import { findProjectRoot } from "./rules/project-root.js";
import { extractCodexToolPaths } from "./tool-paths.js";
export async function runSessionStartHook(input, options = {}) {
    const cachePath = sessionCachePath(input.session_id, options.pluginDataRoot);
    clearSessionState(cachePath);
    return runStaticInjection(input.cwd, "SessionStart", cachePath, options);
}
export async function runUserPromptSubmitHook(input, options = {}) {
    const cachePath = sessionCachePath(input.session_id, options.pluginDataRoot);
    return runStaticInjection(input.cwd, "UserPromptSubmit", cachePath, options);
}
export async function runPostToolUseHook(input, options = {}) {
    const config = configFromEnvironment(options.env);
    if (config.disabled || config.mode === "off" || config.mode === "static") {
        return "";
    }
    const targetPaths = extractCodexToolPaths(input, input.cwd);
    const firstTargetPath = targetPaths[0];
    if (firstTargetPath === undefined) {
        return "";
    }
    const cachePath = sessionCachePath(input.session_id, options.pluginDataRoot);
    const engine = createRulesEngine(options);
    hydrateEngineState(engine, cachePath);
    const loaded = engine.loadDynamicRules(input.cwd, targetPaths);
    const rules = loaded.rules.filter((rule) => !engine.isStaticInjected(rule) && !engine.isDynamicInjected(rule));
    if (rules.length === 0) {
        persistEngineState(engine, cachePath);
        return "";
    }
    const block = engine.formatDynamic(rules, displayPath(input.cwd, firstTargetPath));
    for (const rule of rules) {
        engine.markDynamicInjected(rule);
    }
    persistEngineState(engine, cachePath);
    return formatAdditionalContextOutput("PostToolUse", block);
}
function runStaticInjection(cwd, eventName, cachePath, options) {
    const config = configFromEnvironment(options.env);
    if (config.disabled || config.mode === "off" || config.mode === "dynamic") {
        return "";
    }
    const engine = createRulesEngine(options);
    hydrateEngineState(engine, cachePath);
    engine.state.cwd = cwd;
    const loaded = engine.loadStaticRules(cwd);
    const rules = loaded.rules.filter((rule) => !engine.isStaticInjected(rule));
    if (rules.length === 0) {
        persistEngineState(engine, cachePath);
        return "";
    }
    const block = engine.formatStatic(rules);
    for (const rule of rules) {
        engine.markStaticInjected(rule);
    }
    persistEngineState(engine, cachePath);
    return formatAdditionalContextOutput(eventName, block);
}
function createRulesEngine(options) {
    const config = configFromEnvironment(options.env);
    return createEngine(config, {
        findCandidates: findRuleCandidates,
        findProjectRoot,
        readFile: (path) => {
            try {
                return readFileSync(path, "utf8");
            }
            catch {
                return null;
            }
        },
    });
}
function formatAdditionalContextOutput(eventName, additionalContext) {
    if (additionalContext.trim().length === 0)
        return "";
    return `${JSON.stringify({
        hookSpecificOutput: {
            hookEventName: eventName,
            additionalContext,
        },
    })}\n`;
}
function displayPath(cwd, filePath) {
    return isAbsolute(filePath) ? relative(cwd, filePath) : filePath;
}
//# sourceMappingURL=codex-hook.js.map