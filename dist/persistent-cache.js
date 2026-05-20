import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
export function hydrateEngineState(engine, cachePath) {
    const state = readSessionState(cachePath);
    engine.state.staticDedup.clear();
    engine.state.dynamicDedup.clear();
    engine.state.dynamicTargetFingerprints.clear();
    for (const key of state.staticDedup) {
        engine.state.staticDedup.add(key);
    }
    for (const [scope, keys] of Object.entries(state.dynamicDedup)) {
        engine.state.dynamicDedup.set(scope, new Set(keys));
    }
    for (const [targetKey, fingerprint] of Object.entries(state.dynamicTargetFingerprints ?? {})) {
        engine.state.dynamicTargetFingerprints.set(targetKey, fingerprint);
    }
}
export function persistEngineState(engine, cachePath, completedPostCompactKind) {
    const currentState = readSessionState(cachePath);
    const dynamicDedup = {};
    for (const [scope, keys] of engine.state.dynamicDedup.entries()) {
        dynamicDedup[scope] = [...keys];
    }
    const postCompactPending = nextPostCompactPending(currentState, completedPostCompactKind);
    writeSessionState(cachePath, {
        staticDedup: [...engine.state.staticDedup],
        dynamicDedup,
        dynamicTargetFingerprints: Object.fromEntries(engine.state.dynamicTargetFingerprints.entries()),
        ...(postCompactPending === undefined ? {} : { postCompactPending }),
    });
}
export function clearSessionState(cachePath) {
    rmSync(cachePath, { force: true });
}
export function markSessionCompacted(cachePath) {
    writeSessionState(cachePath, { ...emptyState(), postCompactPending: { static: true, dynamic: true } });
}
export function hasPostCompactPending(cachePath) {
    return postCompactPendingKinds(readSessionState(cachePath)).size > 0;
}
export function isPostCompactPending(cachePath, kind) {
    return postCompactPendingKinds(readSessionState(cachePath)).has(kind);
}
export function sessionCachePath(sessionId, pluginDataRoot) {
    const root = pluginDataRoot ?? process.env["PLUGIN_DATA"] ?? join(homedir(), ".codex", "codex-rules");
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
    return { staticDedup: [], dynamicDedup: {}, dynamicTargetFingerprints: {} };
}
function nextPostCompactPending(state, completedKind) {
    const pendingKinds = postCompactPendingKinds(state);
    if (completedKind !== undefined) {
        pendingKinds.delete(completedKind);
    }
    if (pendingKinds.size === 0) {
        return undefined;
    }
    return {
        ...(pendingKinds.has("static") ? { static: true } : {}),
        ...(pendingKinds.has("dynamic") ? { dynamic: true } : {}),
    };
}
function postCompactPendingKinds(state) {
    const pendingKinds = new Set();
    if (state.compacted === true || state.postCompactPending?.static === true) {
        pendingKinds.add("static");
    }
    if (state.compacted === true || state.postCompactPending?.dynamic === true) {
        pendingKinds.add("dynamic");
    }
    return pendingKinds;
}
function safePathSegment(value) {
    return value.replace(/[^A-Za-z0-9._-]/g, "_").slice(0, 120) || "unknown-session";
}
function isSerializedSessionState(value) {
    if (!isRecord(value) || !Array.isArray(value["staticDedup"]) || !isRecord(value["dynamicDedup"])) {
        return false;
    }
    const staticDedup = value["staticDedup"];
    const dynamicDedup = value["dynamicDedup"];
    const dynamicTargetFingerprints = value["dynamicTargetFingerprints"];
    const postCompactPending = value["postCompactPending"];
    const compacted = value["compacted"];
    return (staticDedup.every((item) => typeof item === "string") &&
        Object.values(dynamicDedup).every((item) => Array.isArray(item) && item.every((nestedItem) => typeof nestedItem === "string")) &&
        (dynamicTargetFingerprints === undefined ||
            (isRecord(dynamicTargetFingerprints) &&
                Object.entries(dynamicTargetFingerprints).every(([targetKey, fingerprint]) => typeof targetKey === "string" && typeof fingerprint === "string"))) &&
        (postCompactPending === undefined || isPostCompactPendingState(postCompactPending)) &&
        (compacted === undefined || typeof compacted === "boolean"));
}
function isPostCompactPendingState(value) {
    return (isRecord(value) &&
        (value["static"] === undefined || typeof value["static"] === "boolean") &&
        (value["dynamic"] === undefined || typeof value["dynamic"] === "boolean"));
}
function isRecord(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}
