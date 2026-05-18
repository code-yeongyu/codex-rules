import { readFileSync, statSync } from "node:fs";
import { isAbsolute, relative, resolve } from "node:path";

import { configFromEnvironment } from "./config.js";
import { clearSessionState, hydrateEngineState, persistEngineState, sessionCachePath } from "./persistent-cache.js";
import { SOURCE_PRIORITY } from "./rules/constants.js";
import { createEngine } from "./rules/engine.js";
import { createRuleDiscoveryCache, findRuleCandidates } from "./rules/finder.js";
import { hashContent } from "./rules/matcher.js";
import { sortCandidates } from "./rules/ordering.js";
import { findProjectRoot } from "./rules/project-root.js";
import type { PiRulesConfig, RuleCandidate } from "./rules/types.js";
import { extractCodexToolPaths } from "./tool-paths.js";

type ContextInjectionHookEventName = "SessionStart" | "UserPromptSubmit" | "PostToolUse";

export type CodexSessionStartInput = {
	session_id: string;
	transcript_path: string | null;
	cwd: string;
	hook_event_name: "SessionStart";
	model: string;
	permission_mode: string;
	source: "startup" | "resume" | "clear";
};

export type CodexUserPromptSubmitInput = {
	session_id: string;
	turn_id: string;
	transcript_path: string | null;
	cwd: string;
	hook_event_name: "UserPromptSubmit";
	model: string;
	permission_mode: string;
	prompt: string;
};

export type CodexPostToolUseInput = {
	session_id: string;
	turn_id: string;
	transcript_path: string | null;
	cwd: string;
	hook_event_name: "PostToolUse";
	model: string;
	permission_mode: string;
	tool_name: string;
	tool_input: unknown;
	tool_response: unknown;
	tool_use_id: string;
};

export type CodexPostCompactInput = {
	session_id: string;
	turn_id: string;
	transcript_path: string | null;
	cwd: string;
	hook_event_name: "PostCompact";
	model: string;
	trigger: "manual" | "auto";
};

export interface CodexRulesHookOptions {
	env?: NodeJS.ProcessEnv;
	pluginDataRoot?: string;
}

interface DynamicTargetFingerprint {
	targetPath: string;
	cacheKey: string;
	fingerprint: string;
}

export async function runSessionStartHook(
	input: CodexSessionStartInput,
	options: CodexRulesHookOptions = {},
): Promise<string> {
	const cachePath = sessionCachePath(input.session_id, options.pluginDataRoot);
	if (input.source !== "resume") {
		clearSessionState(cachePath);
	}
	return runStaticInjection(input.cwd, "SessionStart", cachePath, options);
}

export async function runPostCompactHook(
	input: CodexPostCompactInput,
	options: CodexRulesHookOptions = {},
): Promise<string> {
	clearSessionState(sessionCachePath(input.session_id, options.pluginDataRoot));
	return "";
}

export async function runUserPromptSubmitHook(
	input: CodexUserPromptSubmitInput,
	options: CodexRulesHookOptions = {},
): Promise<string> {
	const cachePath = sessionCachePath(input.session_id, options.pluginDataRoot);
	return runStaticInjection(input.cwd, "UserPromptSubmit", cachePath, options);
}

export async function runPostToolUseHook(
	input: CodexPostToolUseInput,
	options: CodexRulesHookOptions = {},
): Promise<string> {
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
	const dynamicTargetFingerprints = fingerprintDynamicTargets(input.cwd, targetPaths, config);
	const pendingTargetFingerprints = dynamicTargetFingerprints.filter(
		(target) => engine.state.dynamicTargetFingerprints.get(target.cacheKey) !== target.fingerprint,
	);
	if (pendingTargetFingerprints.length === 0) {
		persistEngineState(engine, cachePath);
		return "";
	}

	const loaded = engine.loadDynamicRules(
		input.cwd,
		pendingTargetFingerprints.map((target) => target.targetPath),
	);
	const rules = loaded.rules.filter((rule) => !engine.isStaticInjected(rule) && !engine.isDynamicInjected(rule));
	for (const target of pendingTargetFingerprints) {
		engine.state.dynamicTargetFingerprints.set(target.cacheKey, target.fingerprint);
	}
	if (rules.length === 0) {
		persistEngineState(engine, cachePath);
		return "";
	}

	const firstPendingTargetPath = pendingTargetFingerprints[0]?.targetPath ?? firstTargetPath;
	const block = engine.formatDynamic(rules, displayPath(input.cwd, firstPendingTargetPath));
	for (const rule of rules) {
		engine.markDynamicInjected(rule);
	}
	persistEngineState(engine, cachePath);
	return formatAdditionalContextOutput("PostToolUse", block);
}

function runStaticInjection(
	cwd: string,
	eventName: "SessionStart" | "UserPromptSubmit",
	cachePath: string,
	options: CodexRulesHookOptions,
): string {
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

function createRulesEngine(options: CodexRulesHookOptions) {
	const config = configFromEnvironment(options.env);
	return createEngine(config, {
		findCandidates: findRuleCandidates,
		findProjectRoot,
		readFile: (path) => {
			try {
				return readFileSync(path, "utf8");
			} catch {
				return null;
			}
		},
	});
}

function fingerprintDynamicTargets(
	cwd: string,
	targetPaths: ReadonlyArray<string>,
	config: PiRulesConfig,
): DynamicTargetFingerprint[] {
	const disabledSources = disabledSourcesFor(config);
	const discoveryCache = createRuleDiscoveryCache();
	const cwdProjectRoot = findProjectRoot(cwd);
	const fingerprints: DynamicTargetFingerprint[] = [];

	for (const targetPath of uniqueStrings(targetPaths)) {
		const projectRoot =
			cwdProjectRoot !== null && isSameOrChildPath(targetPath, cwdProjectRoot)
				? cwdProjectRoot
				: findProjectRoot(targetPath);
		const candidates = findRuleCandidates({
			projectRoot,
			targetFile: targetPath,
			disabledSources,
			cache: discoveryCache,
		});
		const candidateFingerprint = sortCandidates(candidates).map(fingerprintCandidate).join("\u0001");
		const cacheKey = dynamicTargetCacheKey(targetPath);
		fingerprints.push({
			targetPath,
			cacheKey,
			fingerprint: hashContent(
				[
					"v1",
					config.enabledSources === "auto" ? "auto" : config.enabledSources.join(","),
					projectRoot ?? "",
					cacheKey,
					candidateFingerprint,
				].join("\u0000"),
			),
		});
	}

	return fingerprints;
}

function fingerprintCandidate(candidate: RuleCandidate): string {
	return [
		candidate.realPath,
		candidate.relativePath,
		candidate.source,
		candidate.isGlobal ? "global" : "project",
		candidate.isSingleFile ? "single" : "multi",
		String(candidate.distance),
		fileFingerprint(candidate.path),
	].join("\u0000");
}

function fileFingerprint(filePath: string): string {
	try {
		const stats = statSync(filePath, { bigint: true });
		const contentHash = hashContent(readFileSync(filePath, "utf8"));
		return `${stats.mtimeNs}:${stats.ctimeNs}:${stats.size}:${contentHash}`;
	} catch {
		return "missing";
	}
}

function disabledSourcesFor(config: PiRulesConfig): ReadonlySet<string> | undefined {
	if (config.enabledSources === "auto") {
		return undefined;
	}

	const enabledSources = new Set(config.enabledSources);
	return new Set([...SOURCE_PRIORITY.keys()].filter((source) => !enabledSources.has(source)));
}

function dynamicTargetCacheKey(targetPath: string): string {
	return toPosixPath(resolve(targetPath));
}

function isSameOrChildPath(childPath: string, parentPath: string): boolean {
	const childRelativePath = relative(parentPath, resolve(childPath));
	return childRelativePath === "" || (!childRelativePath.startsWith("..") && !isAbsolute(childRelativePath));
}

function uniqueStrings(values: ReadonlyArray<string>): string[] {
	const uniqueValues: string[] = [];
	const seenValues = new Set<string>();
	for (const value of values) {
		if (seenValues.has(value)) {
			continue;
		}

		seenValues.add(value);
		uniqueValues.push(value);
	}
	return uniqueValues;
}

function formatAdditionalContextOutput(eventName: ContextInjectionHookEventName, additionalContext: string): string {
	if (additionalContext.trim().length === 0) return "";
	return `${JSON.stringify({
		hookSpecificOutput: {
			hookEventName: eventName,
			additionalContext,
		},
	})}\n`;
}

function displayPath(cwd: string, filePath: string): string {
	const rel = isAbsolute(filePath) ? relative(cwd, filePath) : filePath;
	// Normalize to POSIX separators so injected rule context renders the same
	// path string on Linux/macOS and Windows (Codex feeds this verbatim into
	// the model prompt, and the existing engine already emits POSIX paths).
	return toPosixPath(rel);
}

function toPosixPath(path: string): string {
	return path.replaceAll("\\", "/");
}
