# codex-rules

Codex plugin that injects local project rule files into model context through lifecycle hooks.

It ports the `pi-rules` rule injector to Codex:

- `SessionStart` and `UserPromptSubmit` load static project instructions once per session.
- `PostToolUse` watches Codex `apply_patch` by default, then injects matching file-specific rules as additional context.
- `PostCompact` clears the per-session injection cache after manual or automatic compaction so relevant rules can be reintroduced into the compacted conversation.
- Session-level deduplication prevents the same rule from being repeated after it has been injected.

`PostToolUse` output is context-only: it emits `hookSpecificOutput.additionalContext` and does not rewrite tool output.

The runtime has no npm production dependencies, so a clean Codex marketplace copy can run without a follow-up `npm install`.

## Rule Sources

Project-level sources:

- `AGENTS.md`
- `CLAUDE.md`
- `CONTEXT.md`
- `.omo/rules/**/*.md`
- `.claude/rules/**/*.md`
- `.cursor/rules/**/*.md`
- `.github/instructions/**/*.md`
- `.github/copilot-instructions.md`

User-home sources are also supported by the ported engine when available.

Markdown rule files may use frontmatter such as:

```md
---
description: TypeScript defaults
globs: ["**/*.ts", "**/*.tsx"]
alwaysApply: false
---

Prefer strict TypeScript and keep runtime imports ESM-compatible.
```

## Install from source

This repository is a Codex plugin package, not a Codex plugin marketplace.
Do **not** run `codex plugin marketplace add code-yeongyu/codex-rules`:
the repository does not contain a marketplace manifest, so Codex rejects it.

Codex discovers a personal marketplace automatically from
`~/.agents/plugins/marketplace.json`. Clone this repository into the personal
plugin directory:

```bash
mkdir -p ~/plugins ~/.agents/plugins
git clone https://github.com/code-yeongyu/codex-rules.git ~/plugins/codex-rules
```

If `~/.agents/plugins/marketplace.json` does not already exist, create it
with this content:

```json
{
  "name": "personal",
  "interface": {
    "displayName": "Personal"
  },
  "plugins": [
    {
      "name": "codex-rules",
      "source": {
        "source": "local",
        "path": "./plugins/codex-rules"
      },
      "policy": {
        "installation": "AVAILABLE",
        "authentication": "ON_INSTALL"
      },
      "category": "Developer Tools"
    }
  ]
}
```

If the file already exists, retain its `name`, `interface`, and existing
plugin entries; append only the `codex-rules` object above to its `plugins`
array.

Install the plugin from the implicitly discovered `personal` marketplace:

```bash
codex plugin add codex-rules@personal
codex plugin list
```

Start a new Codex session after installation so the `SessionStart` hook can
load the project rules. If Codex reports that plugins or plugin hooks are
disabled, enable them in `~/.codex/config.toml` and restart Codex:

```toml
[features]
plugins = true
plugin_hooks = true
```

## Configuration

Use `CODEX_RULES_*` environment variables:

| Variable | Values | Default |
| --- | --- | --- |
| `CODEX_RULES_DISABLED` | `1`, `true`, `yes`, `on` | unset |
| `CODEX_RULES_MODE` | `both`, `static`, `dynamic`, `off` | `both` |
| `CODEX_RULES_MAX_RULE_CHARS` | positive integer | `12000` |
| `CODEX_RULES_MAX_RESULT_CHARS` | positive integer | `40000` |
| `CODEX_RULES_ENABLED_SOURCES` | comma-separated source names | `auto` |

For migration from `pi-rules`, equivalent `PI_RULES_*` variables are accepted as fallbacks.

## Debugging

Enable hook phase timing with `NODE_DEBUG=codex-rules`:

```bash
NODE_DEBUG=codex-rules node dist/cli.js hook post-tool-use < fixture.json
```

Debug lines go to stderr and hook JSON stays on stdout. The log includes `PostToolUse` phases such as `extract`, `fingerprint`, `load`, `persist`, elapsed `ms`, target counts, pending counts, rule counts, and output bytes. It does not log rule bodies or tool response contents.

The default `PostToolUse` hook matcher is intentionally strict: it matches only Codex's canonical `apply_patch` hook tool name. Read tools, MCP filesystem tools, shell commands, and Claude-style `Write`/`Edit` aliases are not registered by default.

## Development

```bash
npm install
npm test
npm run check
npm run typecheck
npm pack --dry-run
```

Performance smoke test:

```bash
npm run bench
```

Benchmark timings depend on the local machine. Use the relative counters and repeat-output checks when comparing runs.

Hook smoke test:

```bash
npm run build
printf '%s\n' '{"session_id":"s","transcript_path":null,"cwd":"/path/to/project","hook_event_name":"SessionStart","model":"gpt-5.5","permission_mode":"default","source":"startup"}' \
  | PLUGIN_DATA=/tmp/codex-rules-data node dist/cli.js hook session-start
```

## Privacy

`codex-rules` runs locally. It reads local rule files and Codex hook payloads, writes per-session deduplication state under the Codex plugin data directory, and does not make network requests.

## License

MIT. See [LICENSE](LICENSE) and [NOTICE](NOTICE).
