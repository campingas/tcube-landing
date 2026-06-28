# Deployment Guide — T-Cube Landing Page

This project deploys as a static Vite site on Vercel with Convex providing the live feature poll.

## Deployment Model

- GitHub Actions runs validation on pull requests and pushes to `main`.
- Vercel Git integration owns production deployment from `main`.
- Vercel runs `pnpm deploy:vercel-build`, which deploys Convex and then builds the Vite site with `VITE_CONVEX_URL`.
- Convex stores only aggregate poll counts. No email, IP address, child data, or account identifier is stored.

## Local Setup

Install dependencies:

```bash
pnpm install
```

Copy the environment template:

```bash
cp .env.example .env
```

Start Convex locally:

```bash
pnpm convex:dev
```

Fill `VITE_CONVEX_URL` in `.env` with the local Convex URL if Convex does not populate it automatically.

Run the landing page:

```bash
pnpm dev
```

If `VITE_CONVEX_URL` is empty, the poll falls back to local browser results.

## Convex Setup

1. Create a Convex project.
2. Link this repo with `pnpm convex:dev`.
3. Confirm the functions in `convex/` deploy successfully.
4. In the Convex dashboard, create a deploy key for the production deployment.
5. Copy the deploy key. It is secret and must not be committed.

## Vercel Setup

1. Import the GitHub repository into Vercel.
2. Use the Vite framework preset.
3. Set the install command:

```bash
pnpm install --frozen-lockfile
```

4. Set the build command:

```bash
pnpm deploy:vercel-build
```

5. Set the output directory:

```bash
dist
```

6. Add this environment variable in Vercel for Production and Preview:

```bash
CONVEX_DEPLOY_KEY=<your Convex deploy key>
```

Do not manually set `VITE_CONVEX_URL` in Vercel unless Convex support asks for it. The build script injects it through `convex deploy --cmd-url-env-var-name VITE_CONVEX_URL`.

## GitHub Setup

The workflow at `.github/workflows/ci.yml` runs:

```bash
pnpm install --frozen-lockfile
pnpm verify
pnpm build
```

No Vercel token is required for the recommended setup because Vercel deploys from Git.

## Environment Variables

Local `.env` values:

- `VITE_CONVEX_URL`: public browser URL for Convex.
- `CONVEX_DEPLOY_KEY`: secret key for deploying Convex; only needed locally if you deploy from your machine.
- `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `VERCEL_TOKEN`: reserved for a future GitHub Actions Vercel CLI deployment path.

## Verification

Before merging:

```bash
pnpm verify
pnpm build
```

`pnpm verify` includes the Convex function typecheck.

After production deploy:

- Vote once from one browser and confirm results show.
- Open a second browser or device and confirm live result percentages update.
- Reload the first browser and confirm it still shows results instead of vote options.
