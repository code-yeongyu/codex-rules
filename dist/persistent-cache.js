import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
export function hydrateEngineState(engine, cachePath) {
    const state = readSessionState(cachePath);
    engine.state.staticDedup.clear();
    engine.state.dynamicDedup.clear();
    for (const key of state.staticDedup) {
        engine.state.staticDedup.add(key);
    }
    for (const [scope, keys] of Object.entries(state.dynamicDedup)) {
        engine.state.dynamicDedup.set(scope, new Set(keys));
    }
}
export function persistEngineState(engine, cachePath) {
    const dynamicDedup = {};
    for (const [scope, keys] of engine.state.dynamicDedup.entries()) {
        dynamicDedup[scope] = [...keys];
    }
    writeSessionState(cachePath, {
        staticDedup: [...engine.state.staticDedup],
        dynamicDedup,
    });
}
export function clearSessionState(cachePath) {
    rmSync(cachePath, { force: true });
}
export function sessionCachePath(sessionId, pluginDataRoot) {
    const root = pluginDataRoot ?? process.env.PLUGIN_DATA ?? join(homedir(), ".codex", "codex-rules");
    return join(root, "sessions", `${safePathSegment(sessionId)}.json`);
}
function readSessionState(cachePath) {
    try {
        const parsed = JSON.parse(readFileSync(cachePath, "utf8"));
        if (!isSerializedSessionState(parsed))
            return emptyState();
        return parsed;
    }
    catch {
        return emptyState();
    }
}
function writeSessionState(cachePath, state) {
    mkdirSync(dirname(cachePath), { recursive: true });
    writeFileSync(cachePath, `${JSON.stringify(state)}\n`);
}
function emptyState() {
    return { staticDedup: [], dynamicDedup: {} };
}
function safePathSegment(value) {
    return value.replace(/[^A-Za-z0-9._-]/g, "_").slice(0, 120) || "unknown-session";
}
function isSerializedSessionState(value) {
    if (!isRecord(value) || !Array.isArray(value.staticDedup) || !isRecord(value.dynamicDedup)) {
        return false;
    }
    return (value.staticDedup.every((item) => typeof item === "string") &&
        Object.values(value.dynamicDedup).every((item) => Array.isArray(item) && item.every((nestedItem) => typeof nestedItem === "string")));
}
function isRecord(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}
//# sourceMappingURL=persistent-cache.js.map