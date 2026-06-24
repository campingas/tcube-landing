# Architecture Guide — tcube-landing

> Part of the `docs/developer/` suite. Read `AGENTS.md` first.
> For colours, type scale, voice, and the Jobs checklist → [`branding-guide.md`](./branding-guide.md).

This document owns: stack decisions, directory layout, TypeScript and Vite config, lint rules, code patterns, performance budget, CI/CD, and commit conventions. It does not own visual design. Those concerns are deliberately separated so branding can iterate without touching infrastructure, and infrastructure can evolve without destabilising the design system.

---

## 1. Project Identity

`tcube-landing` is the public entry-point for the T-Cube ecosystem (educational hardware + multilingual content platform). It is a **static site** — no server, no API, no auth. Its single job is to convert a visitor into a curious stakeholder: school decision-maker, parent, or content partner.

Every architectural decision should be filtered through: *does this make the page faster, clearer, or easier to maintain without adding runtime complexity?*

---

## 2. Stack

| Layer | Choice | Constraint |
|---|---|---|
| Bundler | Vite | `^5.x` |
| Language | TypeScript | `^5.4` strict mode |
| Styling | Tailwind CSS | `^3.x` JIT (not v4) |
| Linter | ESLint | `^9.x` flat config |
| Formatter | Prettier | `^3.x` |
| Type check | `tsc --noEmit` | part of CI |
| Package manager | `pnpm` | lockfile committed |
| Task runner | `just` | mirrors all tcube projects |

No React, no Vue, no framework. Vanilla TypeScript + Tailwind. If interactivity grows beyond what vanilla can cleanly express, document the decision here before introducing anything.

---

## 3. Directory Structure

```
tcube-landing/
├── public/                  # Static assets copied verbatim (favicon, og-image, robots.txt)
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   └── images/
│   ├── components/          # Self-contained UI fragments
│   │   └── hero/
│   │       └── hero.ts
│   ├── sections/            # Page sections composed from components
│   │   ├── hero.ts
│   │   ├── features.ts
│   │   ├── languages.ts
│   │   ├── hardware.ts
│   │   └── cta.ts
│   ├── styles/
│   │   ├── base.css         # @tailwind directives + CSS custom properties
│   │   └── animations.css   # Keyframes, motion utilities
│   ├── utils/
│   │   ├── dom.ts           # Typed querySelector helpers
│   │   ├── intersection.ts  # IntersectionObserver scroll reveal
│   │   └── a11y.ts          # Focus management, reduced-motion checks
│   ├── main.ts              # Entry — imports sections, boots observers
│   └── env.d.ts             # Vite client types + custom env declarations
├── index.html
├── tailwind.config.ts       # Typed config — tokens sourced from branding-guide.md
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── eslint.config.js
├── .prettierrc
├── justfile
├── AGENTS.md
└── docs/
    └── developer/
        ├── architecture-guide.md   ← this file
        └── branding-guide.md
```

### Rules

- **No `src/pages/`** — single-page site. Multiple HTML files get their own Vite entries in `vite.config.ts`, not a router.
- **No barrel `index.ts` re-exports** — import files directly to keep tree-shaking trivial and traces readable.
- **`public/` vs `src/assets/`** — hashed filenames go in `src/assets/`. Exact-name files (`robots.txt`, `sitemap.xml`, `og-image.png`) go in `public/`.
- **`tailwind.config.ts` owns all tokens** — it reads values described in `branding-guide.md` and makes them available as Tailwind classes. Neither file duplicates the other: the guide describes intent, the config encodes it as code.

---

## 4. TypeScript Configuration

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "exactOptionalPropertyTypes": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true,
    "skipLibCheck": true,
    "outDir": "dist",
    "rootDir": "src",
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  },
  "include": ["src", "index.html"],
  "exclude": ["node_modules", "dist"]
}
```

### `tsconfig.node.json`

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler",
    "target": "ES2022"
  },
  "include": ["vite.config.ts", "tailwind.config.ts"]
}
```

### Rules

- `strict: true` is non-negotiable. No `// @ts-ignore` without a same-line explanation.
- `noUncheckedIndexedAccess` — all array/object index access returns `T | undefined`. Guards are required.
- `verbatimModuleSyntax` — use `import type` for type-only imports. ESLint enforces this too.
- No `any`. Use `unknown` and narrow. If a third-party type forces `any`, wrap it in a typed utility and comment the boundary.

---

## 5. Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: '.',
  publicDir: 'public',
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },
  build: {
    target: 'es2022',
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: { main: resolve(__dirname, 'index.html') },
    },
    chunkSizeWarningLimit: 200,
  },
  css: { devSourcemap: true },
  server: { port: 5173, strictPort: true, open: false },
  preview: { port: 4173, strictPort: true },
})
```

### Rules

- `target: 'es2022'` — modern browsers only. T-Cube school partners use Chrome/Edge.
- `sourcemap: true` in build — required for debugging Netlify/Vercel previews.
- Never commit `.env.local`. Document all `VITE_`-prefixed vars in `src/env.d.ts` and `.env.example`.

---

## 6. Tailwind Configuration

The Tailwind config is the **code representation** of the brand token system. All colour names, type sizes, spacing steps, and size tokens are described with rationale in [`branding-guide.md`](./branding-guide.md). The config just encodes them — do not invent values here.

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,html}'],
  theme: {
    extend: {
      // ── Colours: Sanzo Wada palette ──────────────────────────────
      // Source of truth and rationale: branding-guide.md §1
      colors: {
        wada: {
          ink:    '#1a2e2a',
          teal:   '#00978d',
          salmon: '#d8a37b',
          rufous: '#c16b27',
          paper:  '#f5ecc2',
          moss:   '#6d7e77',
          slate:  '#253122',
        },
      },

      // ── Typography: φ-scale from seed 16 ─────────────────────────
      // Source of truth and rationale: branding-guide.md §2
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body:    ['"Inter"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'display-hero': ['clamp(2.5rem, 8vw, 6.875rem)', { lineHeight: '1.0',  letterSpacing: '-0.04em'  }],
        'display-h2':   ['clamp(1.75rem, 5vw, 4.25rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        'lead':         ['1.625rem', { lineHeight: '1.6'  }],
        'body':         ['1rem',     { lineHeight: '1.75' }],
        'caption':      ['0.625rem', { lineHeight: '1.5'  }],
      },

      // ── Object size scale: φ from seed 24, god = hero × 2 ────────
      // Source of truth and rationale: branding-guide.md §2
      // Usage: w-size-tile, h-size-hero, etc. (requires plugin or safelist)
      spacing: {
        'size-stamp':  '24px',
        'size-chip':   '39px',
        'size-tile':   '63px',
        'size-block':  '102px',
        'size-hero':   '164px',
        'size-god':    '328px',
      },

      // ── Rhythm spacing: Fibonacci-φ from seed 8 ──────────────────
      // Source of truth and rationale: branding-guide.md §2
      gap: {
        'rhythm-1':  '8px',
        'rhythm-2':  '13px',
        'rhythm-3':  '21px',
        'rhythm-5':  '34px',
        'rhythm-8':  '55px',
        'rhythm-13': '89px',
        'rhythm-21': '144px',
      },

      // ── Animations ────────────────────────────────────────────────
      animation: {
        'fade-up':    'fade-up 0.6s ease both',
        'fade-in':    'fade-in 0.4s ease both',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(1.5rem)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
```

### Rules

- No raw hex values in HTML or TypeScript — all colours via `wada-*` tokens.
- No arbitrary values (`text-[#abc]`, `mt-[37px]`) in production code.
- Dark-first: `wada-ink` is the default background. No `dark:` variants needed in v1.
- No `@apply` except in `base.css`.
- After adding a new directory or file extension, verify Tailwind JIT purge with `pnpm build`.

---

## 7. ESLint Configuration

```javascript
// eslint.config.js
import js from '@eslint/js'
import ts from 'typescript-eslint'
import prettier from 'eslint-config-prettier'

export default ts.config(
  js.configs.recommended,
  ...ts.configs.strictTypeChecked,
  ...ts.configs.stylisticTypeChecked,
  prettier,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // TypeScript
      '@typescript-eslint/no-explicit-any':            'error',
      '@typescript-eslint/consistent-type-imports':    ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-unnecessary-condition':   'error',
      '@typescript-eslint/strict-boolean-expressions': 'error',
      '@typescript-eslint/no-non-null-assertion':      'error',
      '@typescript-eslint/prefer-nullish-coalescing':  'error',
      '@typescript-eslint/prefer-optional-chain':      'error',
      '@typescript-eslint/switch-exhaustiveness-check':'error',
      '@typescript-eslint/no-floating-promises':       'error',
      '@typescript-eslint/await-thenable':             'error',
      '@typescript-eslint/no-misused-promises':        'error',

      // JS quality
      'no-console':        ['warn', { allow: ['warn', 'error'] }],
      'no-debugger':       'error',
      'no-alert':          'error',
      'prefer-const':      'error',
      'no-var':            'error',
      'eqeqeq':            ['error', 'always'],
      'object-shorthand':  'error',
      'no-useless-rename': 'error',

      // Import hygiene
      'no-duplicate-imports': 'error',
    },
    ignores: ['dist/**', 'node_modules/**', '*.config.js'],
  },
)
```

Required dev dependencies: `@eslint/js`, `typescript-eslint`, `eslint-config-prettier`, `eslint`.

### Rules rationale

- `strict-boolean-expressions` — catches `if (maybeNull)` silently passing `null`. Critical with DOM queries.
- `no-non-null-assertion` — `querySelector` returns `Element | null`. Use `dom.ts` helpers instead of `!`.
- `no-floating-promises` — all async calls must be awaited or `.catch`-handled.
- `switch-exhaustiveness-check` — discriminated unions must handle every branch.

---

## 8. Prettier Configuration

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

Prettier runs before ESLint in CI. `eslint-config-prettier` disables conflicting rules. Never configure formatting in ESLint.

---

## 9. Justfile

```justfile
set dotenv-load := true

install:
    pnpm install

dev:
    pnpm vite

check:
    pnpm tsc --noEmit

lint:
    pnpm eslint src --max-warnings 0

fmt:
    pnpm prettier --write src index.html

verify: fmt check lint

build:
    pnpm vite build

preview: build
    pnpm vite preview

analyse:
    ANALYZE=true pnpm vite build
```

`just verify` is the local gate before any push. CI runs the same sequence.

---

## 10. HTML Shell Conventions

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#1a2e2a" />

  <meta property="og:title"       content="T-Cube — Học bằng cách nghe" />
  <meta property="og:description" content="…" />
  <meta property="og:image"       content="/og-image.png" />
  <meta property="og:type"        content="website" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <title>T-Cube</title>
</head>
<body class="bg-wada-ink text-wada-paper antialiased">
  <a href="#main-content" class="sr-only focus:not-sr-only">Skip to content</a>
  <header id="site-header"></header>
  <main id="main-content">
    <section id="hero"></section>
    <section id="features"></section>
    <section id="languages"></section>
    <section id="hardware"></section>
    <section id="cta"></section>
  </main>
  <footer id="site-footer"></footer>
  <script type="module" src="/src/main.ts"></script>
</body>
</html>
```

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

const html = /* html */`
  <div class="…" data-reveal>…</div>
`

export function initHero(): void {
  mount('hero', html)
  revealOnScroll('#hero [data-reveal]')
}
```

```typescript
// src/main.ts
import { initHero }      from '@/sections/hero'
import { initFeatures }  from '@/sections/features'
import { initLanguages } from '@/sections/languages'
import { initHardware }  from '@/sections/hardware'
import { initCta }       from '@/sections/cta'

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

| Asset | Location | Import |
|---|---|---|
| SVG (URL) | `src/assets/images/` | `import src from '@/assets/images/icon.svg?url'` |
| SVG (raw string) | `src/assets/images/` | `import raw from '@/assets/images/icon.svg?raw'` |
| PNG / JPEG | `src/assets/images/` | `import src from '@/assets/images/photo.jpg'` |
| Font | `src/assets/fonts/` | `@font-face` in `base.css` |
| Favicon, OG image | `public/` | path reference in `index.html` |

Vite hashes filenames automatically. Never hardcode hashed paths.

---

## 15. Performance Budget

| Metric | Target |
|---|---|
| JS bundle (gzipped) | < 30 KB |
| CSS bundle (gzipped) | < 20 KB |
| LCP | < 2.5 s on 4G |
| CLS | < 0.1 |
| Render-blocking scripts | zero |

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

English-first. Vietnamese as a secondary layer on the same page — bilingual labels acceptable, bilingual sentences are not. Full multi-locale routing is out of scope for v1.

If a locale toggle is introduced: strings in `src/i18n/vi.ts` and `src/i18n/en.ts` as `Record<string, string>`, active locale in `localStorage` key `tcube_locale`, no i18n library.

---

## 18. CI/CD

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: just verify
      - run: just build
```

`just verify` must pass at zero warnings. `just build` must exit 0. Both are required before any merge to `main`.

Deployment: Netlify or Vercel static export. Publish directory: `dist/`.

---

## 19. Commit & Branch Conventions

Inherits from `AGENTS.md`. Scope values for this repo:

`hero` · `features` · `languages` · `hardware` · `cta` · `a11y` · `perf` · `style` · `config` · `brand`

Examples:
- `feat(hero): add animated device mockup`
- `fix(a11y): add skip-nav link`
- `perf(assets): convert hero image to webp`
- `brand(tokens): update wada-rufous to darker CTA variant`

No squash merges. Linear history on `main`.

---

## 20. What This Project Is Not

- **Not a CMS** — copy lives in TypeScript template strings. If non-developer copy editing is needed, document the architecture change here first.
- **Not an SPA** — no client-side routing. Additional pages get Vite entries, not a router.
- **Not an API consumer** — no `fetch` in production. Contact forms go through Netlify Forms or Formspree.
- **Not a dependency accumulation point** — every `pnpm add` must be justified in the PR. Goal: zero runtime dependencies beyond Tailwind's output.

---
