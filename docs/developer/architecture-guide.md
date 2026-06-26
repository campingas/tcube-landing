# Architecture Guide — tcube-landing

> Part of the `docs/developer/` suite. Read `AGENTS.md` first.
> For colours, type scale, voice, and the Jobs checklist → [`branding-guide.md`](./branding-guide.md).

This document owns: stack decisions, directory layout, TypeScript and Vite config, lint rules, code patterns, performance budget, CI/CD, and commit conventions. It does not own visual design. Those concerns are deliberately separated so branding can iterate without touching infrastructure, and infrastructure can evolve without destabilising the design system.

---

## 1. Project Identity

`tcube-landing` is the public entry-point for the T-Cube ecosystem (educational hardware + multilingual content platform). It is a **static site** — no server, no API, no auth. Its single job is to convert a visitor into a curious stakeholder: school decision-maker, parent, or content partner.

Every architectural decision should be filtered through: _does this make the page faster, clearer, or easier to maintain without adding runtime complexity?_

---

## 2. Stack

| Layer           | Choice         | Constraint                 |
| --------------- | -------------- | -------------------------- |
| Bundler         | Vite           | `^5.x`                     |
| Language        | TypeScript     | `^5.4` strict mode         |
| Styling         | Tailwind CSS   | `^3.x` JIT (not v4)        |
| Linter          | ESLint         | `^9.x` flat config         |
| Formatter       | Prettier       | `^3.x`                     |
| Type check      | `tsc --noEmit` | part of CI                 |
| Package manager | `pnpm`         | lockfile committed         |
| Task runner     | `just`         | mirrors all tcube projects |

No React, no Vue, no framework. Vanilla TypeScript + Tailwind. If interactivity grows beyond what vanilla can cleanly express, document the decision here before introducing anything.

---

## 4. TypeScript Configuration

### Rules

- `strict: true` is non-negotiable. No `// @ts-ignore` without a same-line explanation.
- `noUncheckedIndexedAccess` — all array/object index access returns `T | undefined`. Guards are required.
- `verbatimModuleSyntax` — use `import type` for type-only imports. ESLint enforces this too.
- No `any`. Use `unknown` and narrow. If a third-party type forces `any`, wrap it in a typed utility and comment the boundary.

---

## 5. Vite Configuration

### Rules

- `target: 'es2022'` — modern browsers only. T-Cube school partners use Chrome/Edge.
- `sourcemap: true` in build — required for debugging Netlify/Vercel previews.
- Never commit `.env.local`. Document all `VITE_`-prefixed vars in `src/env.d.ts` and `.env.example`.

---

## 6. Tailwind Configuration

The Tailwind config is the **code representation** of the brand token system. All colour names, type sizes, spacing steps, and size tokens are described with rationale in [`branding-guide.md`](./branding-guide.md). The config just encodes them — do not invent values here.

### Rules

- No raw hex values in HTML or TypeScript — all colours via `wada-*` tokens.
- No arbitrary values (`text-[#abc]`, `mt-[37px]`) in production code.
- Dark-first: `wada-ink` is the default background. No `dark:` variants needed in v1.
- No `@apply` except in `base.css`.
- After adding a new directory or file extension, verify Tailwind JIT purge with `pnpm build`.

---

## 7. ESLint Configuration

Required dev dependencies: `@eslint/js`, `typescript-eslint`, `eslint-config-prettier`, `eslint`.

### Rules rationale

- `strict-boolean-expressions` — catches `if (maybeNull)` silently passing `null`. Critical with DOM queries.
- `no-non-null-assertion` — `querySelector` returns `Element | null`. Use `dom.ts` helpers instead of `!`.
- `no-floating-promises` — all async calls must be awaited or `.catch`-handled.
- `switch-exhaustiveness-check` — discriminated unions must handle every branch.

---

## 8. Prettier Configuration

Prettier runs before ESLint in CI. `eslint-config-prettier` disables conflicting rules. Never configure formatting in ESLint.

---

## 9. Justfile

`just verify` is the local gate before any push. CI runs the same sequence.

---

## 10. HTML Shell Conventions

### Rules

- `lang="en"` on `<html>`. Inline `lang="en"` on mixed-language elements.
- Sections declared in HTML with semantic IDs. TypeScript mounts into them — never `document.write`.
- No inline `<style>` blocks.
- Skip-nav link is the first focusable element in `<body>`.

---

## 11. DOM Utility Pattern

Never use raw `querySelector` in section code.

```typescript
// src/utils/dom.ts
export function qs<T extends Element>(selector: string, scope: ParentNode = document): T {
  const el = scope.querySelector<T>(selector)
  if (el === null) throw new Error(`qs: "${selector}" not found`)
  return el
}

export function qsAll<T extends Element>(selector: string, scope: ParentNode = document): T[] {
  return Array.from(scope.querySelectorAll<T>(selector))
}

export function mount(id: string, html: string): void {
  qs<HTMLElement>(`#${id}`).innerHTML = html
}
```

Throwing with context makes missing elements fail loudly in dev instead of propagating `null` downstream.

---

## 12. Scroll Reveal Pattern

```typescript
// src/utils/intersection.ts
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function revealOnScroll(selector: string, className = 'animate-fade-up'): void {
  if (REDUCED) return
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add(className)
          observer.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.15 },
  )
  qsAll(selector).forEach((el) => observer.observe(el))
}
```

Mark revealable elements with `data-reveal`. Call `revealOnScroll('#section [data-reveal]')` after each `mount()`.

---

## 13. Section Architecture

Each `src/sections/*.ts` file exports one `init*()` function:

```typescript
// src/sections/hero.ts
import { mount } from '@/utils/dom'
import { revealOnScroll } from '@/utils/intersection'

const html = /* html */ `
  <div class="…" data-reveal>…</div>
`

export function initHero(): void {
  mount('hero', html)
  revealOnScroll('#hero [data-reveal]')
}
```

```typescript
// src/main.ts
import { initHero } from '@/sections/hero'
import { initFeatures } from '@/sections/features'
import { initLanguages } from '@/sections/languages'
import { initHardware } from '@/sections/hardware'
import { initCta } from '@/sections/cta'

document.addEventListener('DOMContentLoaded', () => {
  initHero()
  initFeatures()
  initLanguages()
  initHardware()
  initCta()
})
```

### Rules

- Each `init*` is idempotent — calling it twice must not mount twice.
- Sections do not import from each other. Shared state goes in `src/store.ts`.
- Use the `/* html */` comment tag on template strings for editor syntax highlighting.

---

## 14. Asset Handling

| Asset             | Location             | Import                                           |
| ----------------- | -------------------- | ------------------------------------------------ |
| SVG (URL)         | `src/assets/images/` | `import src from '@/assets/images/icon.svg?url'` |
| SVG (raw string)  | `src/assets/images/` | `import raw from '@/assets/images/icon.svg?raw'` |
| PNG / JPEG        | `src/assets/images/` | `import src from '@/assets/images/photo.jpg'`    |
| Font              | `src/assets/fonts/`  | `@font-face` in `base.css`                       |
| Favicon, OG image | `public/`            | path reference in `index.html`                   |

Vite hashes filenames automatically. Never hardcode hashed paths.

---

## 15. Performance Budget

| Metric                  | Target        |
| ----------------------- | ------------- |
| JS bundle (gzipped)     | < 30 KB       |
| CSS bundle (gzipped)    | < 20 KB       |
| LCP                     | < 2.5 s on 4G |
| CLS                     | < 0.1         |
| Render-blocking scripts | zero          |

Run `just analyse` (with `rollup-plugin-visualizer`) before each release. If the bundle grows unexpectedly, find the cause before merging.

---

## 16. Accessibility Requirements

- Skip-nav link is the first focusable element.
- All images have `alt`. Decorative images use `alt=""` + `role="presentation"`.
- Colour contrast: WCAG AA minimum. Specific pairs audited in `branding-guide.md §1`.
- Focus styles must be visible — use Tailwind's `focus:ring`. Never `outline: none` without a replacement.
- All JS-driven interactions degrade gracefully if JS fails.
- Animations respect `prefers-reduced-motion` via the `REDUCED` guard in `intersection.ts`.

---

## 17. i18n Strategy

English-first. European languages come next, followed by Asian languages. Bilingual labels are acceptable only in language-specific UI, and bilingual sentences are not. Full multi-locale routing is out of scope for v1.

If a locale toggle is introduced: strings in `src/i18n/vi.ts` and `src/i18n/en.ts` as `Record<string, string>`, active locale in `localStorage` key `tcube_locale`, no i18n library.

---

## 18. CI/CD

`just verify` must pass at zero warnings. `just build` must exit 0. Both are required before any merge to `main`.

Deployment: Vercel static export. Publish directory: `dist/`.

---

## 20. What This Project Is Not

- **Not a CMS** — copy lives in TypeScript template strings. If non-developer copy editing is needed, document the architecture change here first.
- **Not an SPA** — no client-side routing. Additional pages get Vite entries, not a router.
- **Not an API consumer** — no `fetch` in production. Contact forms go through Netlify Forms or Formspree.
- **Not a dependency accumulation point** — every `pnpm add` must be justified in the PR. Goal: zero runtime dependencies beyond Tailwind's output.

---
