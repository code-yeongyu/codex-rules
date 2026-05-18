import { SOURCE_PRIORITY } from "./rules/constants.js";
import { defaultConfig } from "./rules/engine.js";
const MODE_VALUES = new Set(["static", "dynamic", "both", "off"]);
export function configFromEnvironment(env = process.env) {
    const config = defaultConfig();
    config.disabled = isTruthy(firstEnv(env, "CODEX_RULES_DISABLED", "PI_RULES_DISABLED"));
    config.mode = parseMode(firstEnv(env, "CODEX_RULES_MODE", "PI_RULES_MODE")) ?? config.mode;
    config.maxRuleChars =
        parsePositiveInteger(firstEnv(env, "CODEX_RULES_MAX_RULE_CHARS", "PI_RULES_MAX_RULE_CHARS")) ??
            config.maxRuleChars;
    config.maxResultChars =
        parsePositiveInteger(firstEnv(env, "CODEX_RULES_MAX_RESULT_CHARS", "PI_RULES_MAX_RESULT_CHARS")) ??
            config.maxResultChars;
    config.enabledSources = parseEnabledSources(firstEnv(env, "CODEX_RULES_ENABLED_SOURCES", "PI_RULES_ENABLED_SOURCES"));
    return config;
}
function firstEnv(env, ...names) {
    for (const name of names) {
        const value = env[name];
        if (typeof value === "string" && value.trim().length > 0) {
            return value;
        }
    }
    return undefined;
}
function isTruthy(value) {
    if (value === undefined)
        return false;
    return ["1", "true", "yes", "on"].includes(value.trim().toLowerCase());
}
function parseMode(value) {
    if (value === undefined)
        return undefined;
    const normalized = value.trim().toLowerCase();
    return MODE_VALUES.has(normalized) ? normalized : undefined;
}
function parsePositiveInteger(value) {
    if (value === undefined)
        return undefined;
    const parsed = Number.parseInt(value.trim(), 10);
    return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : undefined;
}
function parseEnabledSources(value) {
    if (value === undefined || value.trim().toLowerCase() === "auto") {
        return "auto";
    }
    const validSources = new Set(SOURCE_PRIORITY.keys());
    const sources = [];
    for (const rawSource of value.split(",")) {
        const source = rawSource.trim();
        if (!validSources.has(source)) {
            continue;
        }
        sources.push(source);
    }
    return sources.length > 0 ? sources : "auto";
}
