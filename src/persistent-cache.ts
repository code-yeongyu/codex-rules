import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";

import type { Engine } from "./rules/engine.js";

interface SerializedSessionState {
	staticDedup: string[];
	dynamicDedup: Record<string, string[]>;
}

export function hydrateEngineState(engine: Engine, cachePath: string): void {
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

export function persistEngineState(engine: Engine, cachePath: string): void {
	const dynamicDedup: Record<string, string[]> = {};
	for (const [scope, keys] of engine.state.dynamicDedup.entries()) {
		dynamicDedup[scope] = [...keys];
	}

	writeSessionState(cachePath, {
		staticDedup: [...engine.state.staticDedup],
		dynamicDedup,
	});
}

export function clearSessionState(cachePath: string): void {
	rmSync(cachePath, { force: true });
}

export function sessionCachePath(sessionId: string, pluginDataRoot: string | undefined): string {
	const root = pluginDataRoot ?? process.env.PLUGIN_DATA ?? join(homedir(), ".codex", "codex-rules");
	return join(root, "sessions", `${safePathSegment(sessionId)}.json`);
}

function readSessionState(cachePath: string): SerializedSessionState {
	try {
		const parsed = JSON.parse(readFileSync(cachePath, "utf8"));
		if (!isSerializedSessionState(parsed)) return emptyState();
		return parsed;
	} catch {
		return emptyState();
	}
}

function writeSessionState(cachePath: string, state: SerializedSessionState): void {
	mkdirSync(dirname(cachePath), { recursive: true });
	writeFileSync(cachePath, `${JSON.stringify(state)}\n`);
}

function emptyState(): SerializedSessionState {
	return { staticDedup: [], dynamicDedup: {} };
}

function safePathSegment(value: string): string {
	return value.replace(/[^A-Za-z0-9._-]/g, "_").slice(0, 120) || "unknown-session";
}

function isSerializedSessionState(value: unknown): value is SerializedSessionState {
	if (!isRecord(value) || !Array.isArray(value.staticDedup) || !isRecord(value.dynamicDedup)) {
		return false;
	}
	return (
		value.staticDedup.every((item) => typeof item === "string") &&
		Object.values(value.dynamicDedup).every(
			(item) => Array.isArray(item) && item.every((nestedItem) => typeof nestedItem === "string"),
		)
	);
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
