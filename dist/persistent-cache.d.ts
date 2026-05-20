import type { Engine } from "./rules/engine.js";
export type PostCompactPendingKind = "static" | "dynamic";
export declare function hydrateEngineState(engine: Engine, cachePath: string): void;
export declare function persistEngineState(engine: Engine, cachePath: string, completedPostCompactKind?: PostCompactPendingKind): void;
export declare function clearSessionState(cachePath: string): void;
export declare function markSessionCompacted(cachePath: string): void;
export declare function hasPostCompactPending(cachePath: string): boolean;
export declare function isPostCompactPending(cachePath: string, kind: PostCompactPendingKind): boolean;
export declare function sessionCachePath(sessionId: string, pluginDataRoot: string | undefined): string;
