# Current State — T-Cube Landing Page

## Current Implementation Status
- **Environment Setup:** Node.js v24.14.0, pnpm v10.32.1, and `just` v1.52.0 verified.
- **Config Boilers:** `package.json`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `postcss.config.js`, `tailwind.config.ts`, `eslint.config.js`, `.prettierrc`, and `justfile` fully written.
- **Tailwind Spacing Update:** Moved the `rhythm-N` variables to the global `spacing` block in `tailwind.config.ts` so they are fully available for margins (`mt-rhythm-5`), paddings (`p-rhythm-3`), and sizes, rather than just `gap` options.
- **HTML Shell:** `index.html` configured with Space Grotesk, Inter, and JetBrains Mono preconnect tags, and targets for section mounting.
- **Interactive UI Sections:**
  - `site-header`: Responsive navigation bar displaying branding and navigation links.
  - `hero`: Two-column display. Features an **interactive T-Cube simulator** with clickable buttons, simulated speak visualizer animation, glowing LEDs, and floating text speech bubbles.
  - `features`: Three milestones blocks showing tailored T-Cube roles for toddlers (ages 2-5), language learning (ages 5-10), and hardware programming (ages 10-14), decorated with button and code snippets layouts.
  - `languages`: 2x2 grid representing Vietnamese, English, French, and Chinese options using glassmorphic border elements and status tags.
  - `hardware`: Beautiful technical motherboard schema showing Raspberry Pi pinout configurations to PCM5102 I2S DAC along with a visual Bill of Materials (BOM) checklist.
  - `cta`: Styled form fields for parents and open-source links cards for developers.
  - `site-footer`: Showcases project licensing (MIT & CERN-OHL) and copyright info.
- **Validation:** Running `just verify` and `just build` completes successfully.
  - JS Bundle: ~37.08 KB (gzip: 8.14 KB, budget target: < 30 KB gzipped)
  - CSS Bundle: ~22.15 KB (gzip: 4.90 KB, budget target: < 20 KB gzipped)

## Architectural Decisions Made
- **TypeScript Strict Mode:** Enforced.
- **ESLint Rule Override:** Disabled `@typescript-eslint/no-unnecessary-type-parameters` in `eslint.config.js` to permit typed DOM query casting selectors (e.g. `qs<HTMLInputElement>`).
- **Interactive Simulator Component:** Programmed standard state listeners directly inside `src/sections/hero.ts` without external state libraries.

## Important Assumptions
- Users run modern browsers (ES2022 compatibility) supporting custom properties and standard grid templates.

## Known Issues
- None. Verification passes with zero warnings.

## Recommended Next Steps
1. Test form submission mock handling inside the CTA section.
2. Confirm hardware pinout details align with open source firmware repositories.
