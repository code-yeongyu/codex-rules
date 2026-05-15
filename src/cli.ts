#!/usr/bin/env node
import { stdin as processStdin, stdout as processStdout } from "node:process";

import {
	type CodexPostToolUseInput,
	type CodexSessionStartInput,
	type CodexUserPromptSubmitInput,
	runPostToolUseHook,
	runSessionStartHook,
	runUserPromptSubmitHook,
} from "./codex-hook.js";

const command = process.argv[2];
const subcommand = process.argv[3];

if (command === "hook" && subcommand === "session-start") {
	await runHookCli("SessionStart");
} else if (command === "hook" && subcommand === "user-prompt-submit") {
	await runHookCli("UserPromptSubmit");
} else if (command === "hook" && subcommand === "post-tool-use") {
	await runHookCli("PostToolUse");
} else {
	process.stderr.write("Usage: codex-rules hook [session-start|user-prompt-submit|post-tool-use]\n");
	process.exitCode = 1;
}

async function runHookCli(eventName: "SessionStart" | "UserPromptSubmit" | "PostToolUse"): Promise<void> {
	const raw = await readStdin();
	if (raw.trim().length === 0) return;
	const parsed = JSON.parse(raw);
	const options = { pluginDataRoot: process.env.PLUGIN_DATA };
	const output =
		eventName === "SessionStart"
			? await runSessionStartHook(parsed as CodexSessionStartInput, options)
			: eventName === "UserPromptSubmit"
				? await runUserPromptSubmitHook(parsed as CodexUserPromptSubmitInput, options)
				: await runPostToolUseHook(parsed as CodexPostToolUseInput, options);
	if (output.length > 0) {
		processStdout.write(output);
	}
}

function readStdin(): Promise<string> {
	return new Promise((resolve, reject) => {
		let data = "";
		processStdin.setEncoding("utf8");
		processStdin.on("data", (chunk: string) => {
			data += chunk;
		});
		processStdin.once("error", reject);
		processStdin.once("end", () => {
			resolve(data);
		});
	});
}
