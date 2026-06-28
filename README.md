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

## Deployment

The recommended production path is Vercel Git deployment from `main`, with Convex deployed during the Vercel build for the live feature poll.

Before deploying, verify locally:

```bash
pnpm verify
pnpm build
```

In Vercel:

- Import the GitHub repository.
- Use the Vite framework preset.
- Set install command to `pnpm install --frozen-lockfile`.
- Set build command to `pnpm deploy:vercel-build`.
- Set output directory to `dist`.
- Add `CONVEX_DEPLOY_KEY` for Production and Preview environments.

Do not commit `.env` files or secrets. `VITE_CONVEX_URL` is injected by the Convex deploy command during the Vercel build. If it is missing locally, the poll falls back to local browser results.

For the full Convex, Vercel, GitHub Actions, and post-deploy checklist, read [docs/developer/deployment-guide.md](./docs/developer/deployment-guide.md).

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
