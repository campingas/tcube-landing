# Agent Instructions

Keep this project as agent-agnostic as possible. This file defines stable repo-wide instructions for any coding agent or contributor.

## Priority Order

When instructions conflict, follow this order:

1. Direct user request
2. This `AGENTS.md`
3. Product direction in `VISION.md`
4. Repo documentation in `docs/developer/`
5. Existing codebase patterns
6. Agent-specific adapter files (for example `CLAUDE.md`, `COPILOT.md`)

## New Sessions

At the start of each session:

- Read `docs/tasks.md` for task tracking and priorities
- Read `VISION.md` for the product contract and project constraints
- Review `docs/developer/README.md` for the documentation index
- Review `docs/developer/architecture-guide.md` — stack, patterns, lint rules, and CI
- Review `docs/developer/branding-guide.md` — colour tokens, size scale, voice / text, and the pre-ship checklist
- Review `docs/developer/testing-guide.md` for repo-specific testing standards
- Review `docs/developer/current-state.md` for the latest known project state
- Check `git status`
- Inspect the relevant project structure before making changes

If any referenced file does not exist, continue and note the missing file rather than failing.

## Context Maintenance

Do not use `AGENTS.md` as a session log.

At the end of any significant task or session, update `docs/developer/current-state.md` with:

- Current implementation status
- Architectural decisions made
- Important assumptions
- Known issues
- Pending TODOs
- Recommended next steps

`AGENTS.md` should remain stable and should only change when repo-wide instructions change.

## Core Working Rules

### Read Before Editing

- Read all directly related files before editing
- Do not infer behavior from filenames alone
- When changing behavior, also inspect:
  - tests
  - config files
  - adjacent modules
  - relevant documentation

### Follow Established Patterns

- Prefer existing patterns from the codebase and `docs/developer/`
- Reuse utilities and abstractions before introducing new ones
- Avoid parallel implementations of the same concept
- Prefer established repo conventions over generic framework advice unless the current pattern is clearly broken

### Senior Architect Mindset

Optimize for:

- Correctness
- Maintainability
- Testability
- Performance
- Operational simplicity

Prefer small, composable changes over broad rewrites unless explicitly requested.

### Scope Discipline

- Do exactly what was requested
- Do not make unrelated refactors unless they are required for correctness
- If you notice important issues outside scope, note them separately instead of changing them silently

## Commits

- Use conventional commits (for example: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`)
- Never include agent branding, assistant names, or co-authorship metadata unless explicitly requested
- Do not commit unless explicitly asked
- If committing is requested, keep commits focused and minimal

## Environment & Safety

### Long-Running Processes

- Do not start long-running dev servers, watchers, or background processes unless explicitly requested
- Prefer one-shot validation commands
- If manual browser/app verification is needed, ask the user to run it and report results

### macOS

- On macOS, use `/usr/bin/open` instead of plain `open`

### Secrets & Local Data

- Never commit secrets, credentials, `.env` files, config secrets, or database files
- Never print secrets into logs or docs
- Treat local data stores as sensitive unless clearly intended for version control

### File Deletion

- Prefer safe, explicit deletion commands (for example `rm -f` for files when appropriate)
- Never delete files you have not inspected unless explicitly instructed

## Code Style & Repo Conventions

### Package Manager

- Use the package manager already established by the repo
- If the repo is new or unclear, default to `pnpm`
- Do not introduce a new package manager unless explicitly requested
- (Example customization: If repo is npm-only, make it explicit here)

### Markdown

- Use single-line paragraphs in Markdown
- Keep headings concise and consistent
- Update relevant docs when behavior or architecture changes

### Filenames

- Use lowercase kebab-case filenames unless the repo already uses a different convention
- Avoid spaces in filenames
- Avoid underscores unless the project already requires them

### Scripts

- Executable scripts should not use file extensions unless the ecosystem or existing repo conventions require them

### Formatting & Modern Patterns

- Match the existing formatter and lint rules
- Prefer modern language and framework patterns already established in the repo
- Prefer explicit types at boundaries and inference internally where it improves readability

## Validation & Quality Gates

After significant changes:

- Run targeted tests first
- Then run repo-level validation where appropriate

At minimum, validate when relevant:

- Types
- Lint
- Tests
- Build

If the repo defines a full validation command, prefer that before handoff.

If full validation cannot be run, clearly state what was and was not verified.

## Testing Expectations

- Add or update tests for business logic changes
- Prefer focused tests close to the changed behavior
- Do not rewrite unrelated tests without reason
- Consult `docs/developer/testing-guide.md` for specific repo patterns
- If a change is intentionally untested, explain why

## Documentation Expectations

When introducing or changing patterns:

- Update relevant files in `docs/developer/`
- Keep examples aligned with actual implementation
- Avoid documenting speculative patterns that are not yet used

## Agent Adapters

Agent-specific instructions should live in separate adapter files that reference this file, for example:

- `CLAUDE.md`
- `COPILOT.md`

Those files should remain thin wrappers and should not duplicate repo-wide rules already defined here.