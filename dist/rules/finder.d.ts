import { scanRuleFiles } from "./scanner.js";
import type { RuleCandidate } from "./types.js";
interface SingleFileInfo {
    path: string;
    realPath: string;
}
export interface RuleDiscoveryCache {
    scannedRuleFiles: Map<string, ReturnType<typeof scanRuleFiles>>;
    singleFileInfo: Map<string, SingleFileInfo | null>;
}
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
    cache?: RuleDiscoveryCache;
}
export declare function createRuleDiscoveryCache(): RuleDiscoveryCache;
export declare function findRuleCandidates(options: FinderOptions): RuleCandidate[];
export {};
