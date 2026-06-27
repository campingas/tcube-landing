# Current State — T-Cube Landing Page

## Implementation Status

The repository now has a Vite + TypeScript + Tailwind static-site implementation of the T-Cube landing page.

The original `tcube-landing.html` remains as an untracked standalone prototype reference with inline CSS and a small inline form handler.

The migrated app uses `index.html` as the semantic shell, `src/main.ts` as the mount entry, `src/sections/*.ts` for section templates, `src/utils/dom.ts` and `src/utils/intersection.ts` for shared DOM/reveal behavior, and `src/styles/base.css` for Tailwind base/component styling.

The project now also includes a dedicated Build one page at `build/index.html`, mounted by `src/build-page.ts` and rendered through `src/sections/build-guide.ts`. It summarizes the assembly notes, product characteristics, and learning-layer document without duplicating the full reference material.

The visual direction from `tcube-landing.html` is preserved structurally: DM Sans body type, DM Serif Display headings, rounded tactile surfaces, split hero with interactive cube, age cards, dark learning layer, build section, and community cards. The implementation uses the Wada-reconciled palette from `docs/developer/branding-guide.md`, with prototype hexes retained in `tailwind.config.ts` comments. The hero cube is now a lazy-loaded Three.js scene with a rounded Wada Black `#111314` body, one centered glowing button on each non-bottom face, no button on the bottom face, soft lighting, and pointer/touch drag rotation.

The current copy is not final. Several wording choices are intentionally pending review, especially where the page explains age ranges, the learning layer, future modes, and community calls to action.

The documented target architecture is present: Vite 5, strict TypeScript, Tailwind 3, ESLint 9 flat config, Prettier 3, `pnpm`, and `just` task aliases.

## Documentation Status

`VISION.md` contains the strongest product contract and should remain the north star for page structure, audience, and claims.

`docs/developer/branding-guide.md` is the current design source of truth. It now includes Wada-reconciled palette tokens with the original `tcube-landing.html` prototype hex values retained as comments, usage rules, contrast notes, type pairing, the prototype modular type scale, radius guidance, component direction, and a quick reference card.

`docs/developer/README.md` is referenced by `AGENTS.md` but does not currently exist.

`README.md` is still a placeholder.

`docs/notes/product-characteristics.md` is present as an untracked product-spec note. It contains hardware/material/tactile details that may inform product copy and design constraints after validation.

`package.json`, `pnpm-lock.yaml`, `tailwind.config.ts`, `vite.config.ts`, `tsconfig.json`, `eslint.config.js`, `postcss.config.js`, `prettier.config.js`, `justfile`, `index.html`, `build/index.html`, and `src/` were added for the static-site implementation. `three` and `@types/three` are installed for the interactive hero cube.

## Architectural Decisions

Keep `AGENTS.md` stable and agent-agnostic. Do not use it as a session log.

Treat `VISION.md` as product direction, not implementation detail.

Use `docs/developer/branding-guide.md` for durable brand tokens, type scale, colour rules, voice rules, contrast requirements, component design direction, and pre-ship design checks.

Defer a new `DESIGN.md` for now. Consider it later only if the project needs a broader design rationale document for page composition, visual examples, interaction principles, and prototype notes that do not belong in a developer-facing branding/token guide.

Do not create a second source of truth for colours or typography. If `DESIGN.md` is added later, it should reference the branding guide for tokens rather than duplicating them.

## Important Assumptions

The current `tcube-landing.html` style and colour direction should be preserved while copy is revised.

The landing page remains static for now: no server, no auth, and no committed secrets.

The learning-layer claims should stay aligned with `VISION.md`: simple device first, optional local Mac intelligence, family-controlled content, and no cloud dependency for the opt-in learning loop.

Hardware claims in public copy need validation before launch.

## Known Issues

`tcube-landing.html` is now a legacy prototype reference outside the documented Vite/Tailwind architecture.

The migrated community section no longer collects email, city, or child ages. It now uses a local feature-interest poll stored in `localStorage`, shows local results after voting, and includes an exit-intent prompt if the visitor leaves through the top of the page before voting. The prompt is armed only after the visitor first moves inside the page, and dismissal through the close button or Escape key is stored so people can decline without being asked again on that device.

Some documentation placeholders remain outside the branding-guide export, including the missing developer README and root README placeholder.

Automated validation passed after the migration, Three.js cube update, and exit-vote dismissal fix: `pnpm verify` and `pnpm build`.

Browser verification for the hero cube passed with Playwright Chromium on desktop `1440x1000` and mobile `390x844`: canvas was nonblank, pixel-diverse, and changed after drag interaction. Screenshots and pixel-check JSON are in `output/playwright/`.

## Pending Work

Review whether the lazy-loaded Three.js hero chunk size is acceptable for launch. The initial app bundle remains small, but the separate `hero-cube` chunk is about 132 KB gzip.

Revise the landing page wording without losing the current visual direction.

Create `docs/developer/README.md` and replace the root `README.md` placeholder.

Confirm CTA destinations and privacy wording.

Confirm final GitHub/docs URLs used by the Build one page.

Replace or remove `tcube-landing.html` after the migrated page is visually approved.

## Recommended Next Steps

First, visually review the migrated Vite page at desktop and mobile widths against the original prototype.

Second, do a copy pass on the migrated Vite page against `VISION.md` while preserving the current structure and visual direction.

Third, confirm final CTA destinations and decide whether the local feature poll needs a backend before launch.
