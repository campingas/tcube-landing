# Current State — T-Cube Landing Page

## Current Implementation Status

- **Environment Setup:** Node.js v24.14.0, pnpm v10.32.1, and `just` v1.52.0 verified.
- **Config Boilers:** `package.json`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `postcss.config.js`, `tailwind.config.ts`, `eslint.config.js`, `.prettierrc`, and `justfile` fully written.
- **Tailwind Spacing Update:** Moved the `rhythm-N` variables to the global `spacing` block in `tailwind.config.ts` so they are fully available for margins (`mt-rhythm-5`), paddings (`p-rhythm-3`), and sizes, rather than just `gap` options.
- **HTML Shell:** `index.html` configured with Space Grotesk, Inter, and JetBrains Mono preconnect tags, and targets for section mounting.
- **Interactive UI Sections:**
  - `site-header`: Responsive navigation bar displaying branding and navigation links.
  - `hero`: Simplified hero copy aligned to the canonical product sentence, with one primary CTA and a still-interactive T-Cube visual focused on short English sentence playback.
  - `features`: Three narrative milestone blocks for toddlers (ages 2-5), language learning (ages 5-10), and maker exploration (ages 10-14), with reduced jargon and more child-first copy.
  - `languages`: 2x2 grid now ordered English first, European languages next, then Asian-language roadmap entries with lower-noise labels and contrast-safe text.
  - `hardware`: Open-hardware schematic panel showing Raspberry Pi Zero 2W to PCM5102 I2S DAC wiring with a clearer BOM-style checklist.
  - `cta`: Family interest form expanded to capture city, number of children, and ages, plus maker links with clearer call-to-action copy.
- `site-footer`: Showcases project licensing (MIT & CERN-OHL) and copyright info.
- **Validation:** Running `just verify` and `just build` completes successfully.
  - JS Bundle: ~37.08 KB (gzip: 8.14 KB, budget target: < 30 KB gzipped)
  - CSS Bundle: ~22.15 KB (gzip: 4.90 KB, budget target: < 20 KB gzipped)

## Architectural Decisions Made

- **TypeScript Strict Mode:** Enforced.
- **ESLint Rule Override:** Disabled `@typescript-eslint/no-unnecessary-type-parameters` in `eslint.config.js` to permit typed DOM query casting selectors (e.g. `qs<HTMLInputElement>`).
- **Interactive Simulator Component:** Programmed standard state listeners directly inside `src/sections/hero.ts` without external state libraries.
- **Brand Tone Cleanup:** Reworked section copy to keep `wada-paper` as the main body text colour and reserve `wada-moss` for non-text accents and borders.
- **Palette Shift:** Updated the Wada palette to a warmer morning-light set in `docs/developer/branding-guide.md`, `tailwind.config.ts`, and `index.html`, replacing the previous dark green-black direction with pale yellow, ivory, seashell pink, porcelain green, coral, olive, and black Wada tokens.
- **Language Direction:** Clarified English-first language priority across `VISION.md`, developer docs, SEO metadata, and live section copy. European languages come next; Asian languages follow. Immediate content claims are limited to short sentence recordings and generated sentence packs.
- **CTA Data Capture:** Added city, children count, and ages fields to better match the family lead-capture guidance in `VISION.md`.

## Important Assumptions

- Users run modern browsers (ES2022 compatibility) supporting custom properties and standard grid templates.
- The page can keep the current interactive hero visual while still behaving as a single-CTA landing page.
- The light-ground palette keeps the existing `wada-*` token names so template classes can survive repeated palette iteration.

## Known Issues

- The hero still uses an interactive device visual, which is acceptable for now but remains richer than the strictest reading of the hero guidance.
- Some small accent labels still use `wada-teal` or `wada-moss`; they should be visually reviewed after each palette iteration because their contrast depends heavily on final colour choices.

## Recommended Next Steps

1. Replace the `/docs` fallback with a real build-guide destination if one is added to the site.
2. Test form submission mock handling inside the CTA section.
3. Confirm hardware pinout details align with open source firmware repositories.
4. Visually review the light palette in-browser and adjust accent usage if tiny labels need stronger contrast.
