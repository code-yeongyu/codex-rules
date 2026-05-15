# Changelog

## 0.1.0 - 2026-05-15

- Port `pi-rules` rule loading, matching, formatting, truncation, and deduplication to a Codex plugin.
- Add `SessionStart`, `UserPromptSubmit`, and `PostToolUse` hooks for static and file-specific context injection.
- Add persistent per-session deduplication under Codex plugin data.
- Add Codex-aware path extraction for read, write, edit, multi-edit, `apply_patch`, and shell command payloads.
- Add tests, CI, release workflow, marketplace metadata, and local install support.
