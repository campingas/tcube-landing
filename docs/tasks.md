# T-Cube Landing Page Task Tracking

## Now

- [x] Add a dedicated public Build one page sourced from `docs/notes/assembly-instructions.md`, `docs/notes/product-characteristics.md`, and `docs/notes/learning.md`.
- [x] Decide where the visual design source of truth lives for now: keep current design inputs in `docs/developer/branding-guide.md`; revisit `DESIGN.md` later only if page-level design rationale outgrows the branding guide.
- [x] Extract the current `tcube-landing.html` colour palette, typography choices, spacing rhythm, component-radius decisions, and component direction into `docs/developer/branding-guide.md`.
- [x] Verify current prototype colours against Wada catalogue references before adding Wada numbers or Wada colour names.
- [x] Reconcile `tcube-landing.html` with the intended Vite + TypeScript + Tailwind architecture documented in `docs/developer/architecture-guide.md`.
- [x] Replace family lead capture with a local feature-interest poll and exit-intent vote prompt.
- [ ] Review and revise landing-page copy in the migrated Vite page; the current visual style and colour direction are liked, but some wording is intentionally pending.
- [x] Review the migrated Vite hero cube visually on desktop and mobile; the interactive Three.js canvas renders and responds to drag.
- [x] Fix the exit-intent feature vote prompt so it does not appear on page load and can be dismissed without voting.
- [ ] Decide whether the lazy-loaded Three.js hero chunk size is acceptable for launch.

## Next

- [ ] Create or restore `docs/developer/README.md`, which is referenced by `AGENTS.md` but currently missing.
- [ ] Replace `README.md` placeholder content with a short project overview, local setup, validation commands, and links to the developer docs.
- [ ] Confirm the landing page CTA targets for build guide, GitHub, community, privacy, and feature poll; current links are placeholders.
- [ ] Confirm final GitHub/docs URLs used by the Build one page.
- [ ] Decide whether the feature poll remains local-only for v1 or needs a privacy-respecting backend/service before launch.
- [ ] Validate product and hardware claims against the latest hardware docs before shipping public copy.
- [ ] Replace or remove the standalone `tcube-landing.html` prototype once the migrated Vite page is approved.

## Validation Before Handoff

- [x] Run targeted validation after code changes.
- [x] Run repo-level validation when the Vite project structure exists or after the static page is wired into the build.
- [x] Perform desktop/mobile browser checks for the interactive hero cube.
- [ ] Perform full manual responsive and accessibility checks against the testing guide before release.
