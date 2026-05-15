import type { RuleCandidate } from "./types.js";
export interface FinderOptions {
    /** Project root absolute path (use findProjectRoot to get this). */
    projectRoot: string | null;
    /** Target file path (used for distance calculation in dynamic injection mode). null for static mode. */
    targetFile: string | null;
    /** User home directory (default: os.homedir()). Injectable for tests. */
    homeDir?: string;
    /** Set of disabled sources to omit from discovery. Empty by default. */
    disabledSources?: ReadonlySet<string>;
    /** Whether to skip user-home rules. Default: false. */
    skipUserHome?: boolean;
}
export declare function findRuleCandidates(options: FinderOptions): RuleCandidate[];
//# sourceMappingURL=finder.d.ts.map