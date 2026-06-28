# T-Cube Landing Page

Static landing page for T-Cube: a screen-free language-learning cube for families, makers, and contributors.

The site is built with Vite, TypeScript, and Tailwind. It is intentionally simple: one landing page, in-page drawers for build and LLM details.

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the dev server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

## Validation

Run the standard repo gate:

```bash
pnpm verify
```

This checks formatting, TypeScript, Convex functions, and ESLint. `pnpm build` should also pass before handoff or deployment.

If `just` is installed, the same commands are available as:

```bash
just verify
just build
just dev
just preview
```

## Documentation

- Product direction: [VISION.md](./VISION.md)
- Task tracking: [docs/tasks.md](./docs/tasks.md)
- Developer docs index: [docs/developer/README.md](./docs/developer/README.md)
- Architecture guide: [docs/developer/architecture-guide.md](./docs/developer/architecture-guide.md)
- Branding guide: [docs/developer/branding-guide.md](./docs/developer/branding-guide.md)
- Deployment guide: [docs/developer/deployment-guide.md](./docs/developer/deployment-guide.md)
- Testing guide: [docs/developer/testing-guide.md](./docs/developer/testing-guide.md)
- Current state: [docs/developer/current-state.md](./docs/developer/current-state.md)

## Notes

The site links to the latest T-Cube Pi firmware release at `https://github.com/campingas/tcube-pi/releases/latest`.
