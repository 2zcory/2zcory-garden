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
npm run dev
```
