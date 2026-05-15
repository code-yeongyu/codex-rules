import { truncateBudget, truncateRule } from "./truncator.js";
function formatRule(rule) {
    return `Instructions from: ${rule.path}\n${rule.body}`;
}
function truncateRules(rules, options) {
    const perRuleTruncated = rules.map((rule) => ({
        path: rule.path,
        relativePath: rule.relativePath,
        body: truncateRule(rule.body, { maxChars: options.maxRuleChars, relativePath: rule.relativePath }).body,
    }));
    const budgetedRules = truncateBudget({
        rules: perRuleTruncated.map((rule) => ({ body: rule.body, relativePath: rule.relativePath })),
        maxResultChars: options.maxResultChars,
    });
    const truncatedRules = [];
    for (let index = 0; index < budgetedRules.length; index += 1) {
        const sourceRule = perRuleTruncated[index];
        const budgetedRule = budgetedRules[index];
        if (sourceRule === undefined || budgetedRule === undefined) {
            continue;
        }
        truncatedRules.push({
            path: sourceRule.path,
            relativePath: budgetedRule.relativePath,
            body: budgetedRule.body,
        });
    }
    return truncatedRules;
}
export function formatStaticBlock(rules, options) {
    if (rules.length === 0) {
        return "";
    }
    return `\n\n## Project Instructions\n${truncateRules(rules, options).map(formatRule).join("\n\n")}`;
}
export function formatDynamicBlock(rules, targetRelativePath, options) {
    if (rules.length === 0) {
        return "";
    }
    return `\n\nAdditional project instructions matched for ${targetRelativePath}:\n\n${truncateRules(rules, options)
        .map(formatRule)
        .join("\n\n")}`;
}
//# sourceMappingURL=formatter.js.map