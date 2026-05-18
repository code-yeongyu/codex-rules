import type { Engine } from "./rules/engine.js";
export declare function hydrateEngineState(engine: Engine, cachePath: string): void;
export declare function persistEngineState(engine: Engine, cachePath: string): void;
export declare function clearSessionState(cachePath: string): void;
export declare function sessionCachePath(sessionId: string, pluginDataRoot: string | undefined): string;
