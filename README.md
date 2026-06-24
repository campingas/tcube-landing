# T-Cube Landing Page

> The public gateway to the T-Cube screen-free language learning device ecosystem.

T-Cube is a small, tactile hardware device that reads sentences and lessons aloud to children — starting with English first, then other languages — so they learn naturally by listening. This repository hosts the static landing page to speak to families, school partners, and open-source makers.

---

## 🛠️ Stack & Technologies

This is a **pure static site** optimized for speed, clarity, and accessibility. We deliberately avoid framework overhead (no React/Vue) to maintain an ultra-fast loading time and simple maintenance.

- **Build Tool:** [Vite v5](https://vitejs.dev/)
- **Language:** Strict [TypeScript](https://www.typescriptlang.org/) (ES2022 target)
- **Styling:** [Tailwind CSS v3](https://v3.tailwindcss.com/) (JIT Mode)
- **Formatter:** [Prettier](https://prettier.io/)
- **Linter:** [ESLint v9](https://eslint.org/) (Flat Config)
- **Task Runner:** [just](https://github.com/casey/just)
- **Package Manager:** `pnpm`

---

## 📁 Repository Structure

```text
tcube-landing/
├── docs/
│   ├── tasks.md                 # Current task board and tracking
│   └── developer/
│       ├── architecture-guide.md # Stack rules, TypeScript, ESLint, and CI conventions
│       ├── branding-guide.md     # Wada Sanzo color tokens, type & spacing scales, voice
│       ├── current-state.md      # Latest project state and notes
│       └── testing-guide.md      # Testing standards and validation routines
├── public/                      # Raw static assets (robots.txt, og-image.png, favicon)
├── src/
│   ├── assets/                  # Hashed asset imports (images, local web fonts)
│   ├── components/              # Reusable UI fragments
│   ├── sections/                # Page sections (hero, features, languages, hardware, cta)
│   ├── styles/
│   │   ├── base.css             # Tailwind rules and custom design properties
│   │   └── animations.css       # Custom animations and scroll reveals
│   ├── utils/
│   │   ├── dom.ts               # Typesafe element querying and DOM mounting
│   │   ├── intersection.ts      # Scroll reveal handlers (checks prefers-reduced-motion)
│   │   └── a11y.ts              # Focus controls and media queries helper
│   ├── main.ts                  # App entry point
│   └── env.d.ts                 # Vite client types
├── tailwind.config.ts           # Wada theme config (extends tailwind with guide tokens)
├── vite.config.ts               # Vite packaging specs
├── tsconfig.json                # Strict TypeScript configuration
├── eslint.config.js             # Type-aware lint checks
├── .prettierrc                  # Standard code styles
└── justfile                     # Task commands list
```

---

## 🚀 Quick Start

Ensure you have [Node.js](https://nodejs.org/) (v22+ recommended), [pnpm](https://pnpm.io/), and [just](https://github.com/casey/just) installed.

### 1. Install Dependencies
```bash
just install
```

### 2. Run Local Development Server
```bash
just dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Verify Code Quality (Fmt, Build, and Lint)
```bash
just verify
```

### 4. Build Production Bundle
```bash
just build
```
The optimized bundle will be created inside the `dist/` directory.

### 5. Preview Production Build Locally
```bash
just preview
```

---

## 🎨 Design System & Rationale

T-Cube follows a strict design token guidelines summarized from [`branding-guide.md`](docs/developer/branding-guide.md):

- **Palette:** Derived from Sanzo Wada's classic dictionary combination `#214`.
  - Background is `wada-ink` (`#1a2e2a`), text is `wada-paper` (`#f5ecc2`), and accents are `wada-teal` (`#00978d`) and `wada-rufous` (`#c16b27`).
- **Typography & Object Scale:** Sized on golden-ratio ($\phi = 1.618$) ladders for typographic hierarchy (`display-hero`, `display-h2`, `lead`) and layout elements (`rhythm-1` to `rhythm-21`).
- **Screen-Free:** The lack of a screen is T-Cube's key feature. The design supports quiet, child-safe, and tactile experiences.