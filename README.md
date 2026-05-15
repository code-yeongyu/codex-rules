# codex-rules

Codex plugin that injects local project rule files into model context through lifecycle hooks.

It ports the `pi-rules` rule injector to Codex:

- `SessionStart` and `UserPromptSubmit` load static project instructions once per session.
- `PostToolUse` watches file reads and edits, then injects matching file-specific rules.
- Session-level deduplication prevents the same rule from being repeated after it has been injected.

## Rule Sources

Project-level sources:

- `AGENTS.md`
- `CLAUDE.md`
- `CONTEXT.md`
- `.sisyphus/rules/**/*.md`
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

## Install Locally

From the marketplace workspace:

```bash
codex plugin marketplace add /Users/yeongyu/local-workspaces/codex-plugins
node /Users/yeongyu/local-workspaces/codex-plugins/scripts/install-local.mjs /Users/yeongyu/local-workspaces/codex-plugins
```

The local installer builds the plugin, copies a clean cache entry to:

```text
~/.codex/plugins/cache/code-yeongyu-codex-plugins/codex-rules/0.1.0
```

It also enables:

```toml
[features]
plugins = true

[plugins."codex-rules@code-yeongyu-codex-plugins"]
enabled = true
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

## Development

```bash
npm install
npm test
npm run check
npm pack --dry-run
```

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
