#!/usr/bin/env node
import { stdin as processStdin, stdout as processStdout } from "node:process";
import { runPostToolUseHook, runSessionStartHook, runUserPromptSubmitHook, } from "./codex-hook.js";
const command = process.argv[2];
const subcommand = process.argv[3];
if (command === "hook" && subcommand === "session-start") {
    await runHookCli("SessionStart");
}
else if (command === "hook" && subcommand === "user-prompt-submit") {
    await runHookCli("UserPromptSubmit");
}
else if (command === "hook" && subcommand === "post-tool-use") {
    await runHookCli("PostToolUse");
}
else {
    process.stderr.write("Usage: codex-rules hook [session-start|user-prompt-submit|post-tool-use]\n");
    process.exitCode = 1;
}
async function runHookCli(eventName) {
    const raw = await readStdin();
    if (raw.trim().length === 0)
        return;
    const parsed = parseHookInput(raw);
    if (!parsed)
        return;
    const options = { pluginDataRoot: process.env.PLUGIN_DATA };
    const output = eventName === "SessionStart" && isCodexSessionStartInput(parsed)
        ? await runSessionStartHook(parsed, options)
        : eventName === "UserPromptSubmit" && isCodexUserPromptSubmitInput(parsed)
            ? await runUserPromptSubmitHook(parsed, options)
            : eventName === "PostToolUse" && isCodexPostToolUseInput(parsed)
                ? await runPostToolUseHook(parsed, options)
                : "";
    if (output.length > 0) {
        processStdout.write(output);
    }
}
function parseHookInput(raw) {
    try {
        const parsed = JSON.parse(raw);
        return parsed;
    }
    catch {
        return undefined;
    }
}
function isCodexSessionStartInput(value) {
    return (isRecord(value) &&
        value.hook_event_name === "SessionStart" &&
        typeof value.session_id === "string" &&
        typeof value.cwd === "string" &&
        typeof value.model === "string" &&
        typeof value.permission_mode === "string" &&
        typeof value.source === "string");
}
function isCodexUserPromptSubmitInput(value) {
    return (isRecord(value) &&
        value.hook_event_name === "UserPromptSubmit" &&
        typeof value.session_id === "string" &&
        typeof value.turn_id === "string" &&
        typeof value.cwd === "string" &&
        typeof value.model === "string" &&
        typeof value.permission_mode === "string" &&
        typeof value.prompt === "string");
}
function isCodexPostToolUseInput(value) {
    return (isRecord(value) &&
        value.hook_event_name === "PostToolUse" &&
        typeof value.session_id === "string" &&
        typeof value.turn_id === "string" &&
        typeof value.cwd === "string" &&
        typeof value.model === "string" &&
        typeof value.permission_mode === "string" &&
        typeof value.tool_name === "string" &&
        typeof value.tool_use_id === "string");
}
function isRecord(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}
function readStdin() {
    return new Promise((resolve, reject) => {
        let data = "";
        processStdin.setEncoding("utf8");
        processStdin.on("data", (chunk) => {
            data += chunk;
        });
        processStdin.once("error", reject);
        processStdin.once("end", () => {
            resolve(data);
        });
    });
}
//# sourceMappingURL=cli.js.map