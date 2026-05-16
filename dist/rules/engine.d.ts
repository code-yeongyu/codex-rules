import { type RuleDiscoveryCache } from "./finder.js";
import type { LoadedRule, PiRulesConfig, RuleCandidate, RuleDiagnostic, SessionState } from "./types.js";
export interface EngineDeps {
    findCandidates: (options: {
        projectRoot: string | null;
        targetFile: string | null;
        homeDir?: string;
        disabledSources?: ReadonlySet<string>;
        skipUserHome?: boolean;
        cache?: RuleDiscoveryCache;
    }) => RuleCandidate[];
    readFile: (path: string) => string | null;
    findProjectRoot: (startPath: string) => string | null;
}
export interface Engine {
    state: SessionState;
    config: PiRulesConfig;
    loadStaticRules(cwd: string): {
        rules: LoadedRule[];
        diagnostics: RuleDiagnostic[];
    };
    loadDynamicRules(cwd: string, targetPaths: ReadonlyArray<string>): {
        rules: LoadedRule[];
        diagnostics: RuleDiagnostic[];
    };
    formatStatic(rules: ReadonlyArray<LoadedRule>): string;
    formatDynamic(rules: ReadonlyArray<LoadedRule>, target: string): string;
    resetSession(cwd?: string): void;
    isStaticInjected(rule: LoadedRule): boolean;
    isDynamicInjected(rule: LoadedRule): boolean;
    markStaticInjected(rule: LoadedRule): boolean;
    markDynamicInjected(rule: LoadedRule): boolean;
}
export declare function defaultConfig(): PiRulesConfig;
export declare function createEngine(config: PiRulesConfig, deps: EngineDeps): Engine;
//# sourceMappingURL=engine.d.ts.map