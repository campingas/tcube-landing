# Developer Documentation

This directory is the developer-facing reference for the T-Cube landing page.

Read these files in this order when starting work:

1. [`../../docs/tasks.md`](../tasks.md) — active task tracking and release checklist.
2. [`../../VISION.md`](../../VISION.md) — product contract, audience, and section intent.
3. [`architecture-guide.md`](./architecture-guide.md) — stack, Vite structure, TypeScript rules, linting, CI, and performance budget.
4. [`branding-guide.md`](./branding-guide.md) — Wada colour tokens, typography, spacing, voice, and design checklist.
5. [`deployment-guide.md`](./deployment-guide.md) — Vercel, Convex, environment variables, and CI/CD setup.
6. [`testing-guide.md`](./testing-guide.md) — automated checks and manual UI verification expectations.
7. [`current-state.md`](./current-state.md) — latest implementation status, assumptions, known issues, and next steps.

## Source Of Truth

`VISION.md` owns product intent. `branding-guide.md` owns visual and voice decisions. `architecture-guide.md` owns implementation patterns. `current-state.md` is a session handoff note, not a design or architecture authority.

## Current Architecture

The site is a static Vite + TypeScript + Tailwind app with one HTML shell at `index.html`.

Substantial supporting material should appear in in-page drawers before introducing additional page shells. The current Build and LLM operator experiences are implemented as drawers under `src/sections/`.

## Validation

Before handoff, run:

```bash
pnpm verify
pnpm build
```

Use `pnpm format` only when you intend to apply formatting changes.

`pnpm verify` checks formatting, TypeScript, Convex functions, and ESLint.

## Related Notes

- Assembly reference: [`../notes/assembly-instructions.md`](../notes/assembly-instructions.md)
- Learning operator reference: [`../notes/learning.md`](../notes/learning.md)
- Product characteristics: [`../notes/product-characteristics.md`](../notes/product-characteristics.md)
