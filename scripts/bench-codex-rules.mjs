#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createEngine, defaultConfig } from "../dist/rules/engine.js";

const ITERATIONS = 40;
const WARMUP_ITERATIONS = 5;
const RULE_COUNT = 120;
const DISTINCT_TARGET_COUNT = 80;
const DUPLICATE_TARGET_COUNT = 240;

const args = process.argv.slice(2);
const writeBaselinePath = readOption("--write-baseline");
const comparePath = readOption("--compare");

const result = runBenchmark();

if (writeBaselinePath !== undefined) {
	writeFileSync(writeBaselinePath, `${JSON.stringify(result, null, "\t")}\n`);
}

if (comparePath !== undefined) {
	const baseline = JSON.parse(readFileSync(comparePath, "utf8"));
	const failures = compareResults(baseline, result);
	if (failures.length > 0) {
		for (const failure of failures) {
			process.stderr.write(`${failure}\n`);
		}
		process.exitCode = 1;
	}
}

process.stdout.write(`${JSON.stringify(result, null, "\t")}\n`);

function readOption(name) {
	const index = args.indexOf(name);
	if (index === -1) {
		return undefined;
	}

	const value = args[index + 1];
	if (value === undefined || value.startsWith("--")) {
		throw new Error(`${name} requires a value`);
	}
	return value;
}

function runBenchmark() {
	const scenarios = [
		runScenario("duplicate-targets", duplicateTargets, DUPLICATE_TARGET_COUNT),
		runScenario("distinct-targets", distinctTargets, DISTINCT_TARGET_COUNT),
	];
	return {
		commit: gitCommit(),
		iterations: ITERATIONS,
		warmupIterations: WARMUP_ITERATIONS,
		ruleCount: RULE_COUNT,
		scenarios,
	};
}

function runScenario(name, targetFactory, targetCount) {
	const durations = [];
	let counters = { findProjectRoot: 0, findCandidates: 0, readFile: 0 };

	for (let iteration = 0; iteration < ITERATIONS + WARMUP_ITERATIONS; iteration += 1) {
		const run = measureRun(targetFactory);
		if (iteration >= WARMUP_ITERATIONS) {
			durations.push(run.durationMs);
			counters = addCounters(counters, run.counters);
		}
	}

	return {
		name,
		targetCount,
		medianMs: median(durations),
		minMs: Math.min(...durations),
		maxMs: Math.max(...durations),
		counters,
	};
}

function measureRun(targetPaths) {
	const projectRoot = mkdtempSync(join(tmpdir(), "codex-rules-bench-"));
	try {
		const candidates = makeCandidates(projectRoot);
		mkdirSync(join(projectRoot, ".sisyphus", "rules"), { recursive: true });
		for (const candidate of candidates) {
			writeFileSync(candidate.path, "");
		}
		const counters = { findProjectRoot: 0, findCandidates: 0, readFile: 0 };
		const engine = createEngine(defaultConfig(), {
			findProjectRoot: () => {
				counters.findProjectRoot += 1;
				return projectRoot;
			},
			findCandidates: () => {
				counters.findCandidates += 1;
				return candidates;
			},
			readFile: (path) => {
				counters.readFile += 1;
				return ruleContent(path);
			},
		});
		const generatedTargetPaths = targetPaths(projectRoot);
		const start = process.hrtime.bigint();
		engine.loadDynamicRules(projectRoot, generatedTargetPaths);
		const durationMs = Number(process.hrtime.bigint() - start) / 1_000_000;
		return { durationMs, counters };
	} finally {
		rmSync(projectRoot, { recursive: true, force: true });
	}
}

function duplicateTargets(projectRoot) {
	const targetPath = join(projectRoot, "src", "app.ts");
	return Array.from({ length: DUPLICATE_TARGET_COUNT }, () => targetPath);
}

function distinctTargets(projectRoot) {
	return Array.from({ length: DISTINCT_TARGET_COUNT }, (_, index) => join(projectRoot, "src", `file-${index}.ts`));
}

function makeCandidates(projectRoot) {
	return Array.from({ length: RULE_COUNT }, (_, index) => ({
		path: join(projectRoot, ".sisyphus", "rules", `rule-${index}.md`),
		realPath: join(projectRoot, ".sisyphus", "rules", `rule-${index}.md`),
		source: ".sisyphus/rules",
		distance: 0,
		isGlobal: false,
		isSingleFile: false,
		relativePath: `.sisyphus/rules/rule-${index}.md`,
	}));
}

function ruleContent(path) {
	return ["---", "globs: **/*.ts", "---", "", `Rule from ${path}`].join("\n");
}

function addCounters(left, right) {
	return {
		findProjectRoot: left.findProjectRoot + right.findProjectRoot,
		findCandidates: left.findCandidates + right.findCandidates,
		readFile: left.readFile + right.readFile,
	};
}

function median(values) {
	const sorted = [...values].sort((left, right) => left - right);
	const index = Math.floor(sorted.length / 2);
	return sorted[index] ?? 0;
}

function gitCommit() {
	try {
		return execFileSync("git", ["rev-parse", "--short", "HEAD"], { encoding: "utf8" }).trim();
	} catch {
		return "unknown";
	}
}

function compareResults(baseline, current) {
	const failures = [];
	for (const scenario of current.scenarios) {
		const baselineScenario = baseline.scenarios.find((candidate) => candidate.name === scenario.name);
		if (baselineScenario === undefined) {
			failures.push(`missing baseline scenario: ${scenario.name}`);
			continue;
		}

		for (const counterName of ["findProjectRoot", "findCandidates", "readFile"]) {
			if (scenario.counters[counterName] > baselineScenario.counters[counterName]) {
				failures.push(
					`${scenario.name}.${counterName} regressed: ${scenario.counters[counterName]} > ${baselineScenario.counters[counterName]}`,
				);
			}
		}
	}
	return failures;
}
