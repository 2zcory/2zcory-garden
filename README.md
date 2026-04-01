# 2zcory Garden

Public source repository for `2zcory-garden`.

## Status

- Next.js App Router baseline for the public site is in place.
- Product context, stories, and internal workflow live in the matching private repository: `~/wp/2zcory-garden-ctx`.
- Initial content strategy is `file-based` and intentionally thin.

## Current Baseline

- Shared layout and primary navigation shell
- Public routes:
  - `/`
  - `/about`
  - `/projects`
  - `/projects/[slug]`
  - `/writing`
  - `/writing/[slug]`
  - `/garden`
  - `/garden/[slug]`
  - `/contact`
- Domain types and file-based content loaders for `Profile`, `Project`, `Article`, and `Note`

## Development

```bash
npm install
npm run lint
npm run build
npm run dev
```

## Public Smoke Check

Run the lightweight public smoke check against the live site:

```bash
npm run smoke:public
```

Override the default deployment URL when needed:

```bash
SMOKE_BASE_URL=https://example.com npm run smoke:public
```

## CI/CD

- `CI`: runs `npm ci`, `npm run lint`, and `npm run build` on every push and pull request.
- `Preview Deploy`: runs from GitHub Actions on every push and creates a Vercel preview deployment from the remote branch state.
- `Production Release`: manual GitHub Actions workflow only. Production is not meant to auto-release on push.

### Required GitHub configuration

- Repository secret: `VERCEL_TOKEN`
- Repository variables:
  - `VERCEL_ORG_ID`
  - `VERCEL_PROJECT_ID`
