# WildFire Tracker — Agent & Contributor Guide

Professional wildfire monitoring dashboard. **Next.js 15 (App Router)** +
TypeScript + Tailwind CSS v4 + shadcn/ui.

## Status

Phase 1 = **foundation only**. No map, no UI features, and no backend are wired
yet. Keep changes aligned with the architecture below; do not restructure.

## Commands

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run lint` / `npm run lint:fix` — ESLint
- `npm run typecheck` — `tsc --noEmit` (strict)
- `npm run format` — Prettier write

## Conventions

- **Strict TypeScript.** Use the `@/` import alias (project root).
- **Feature-based structure.** Vertical slices live in `features/`; shared,
  presentational pieces in `components/`. Dependencies flow
  `features → components/services/lib`, never the reverse, and features never
  import another feature's internals (only its `index.ts`).
- **State:** Zustand (`store/`) for global client/UI state; React Query for
  server state. Isolate MapLibre in `components/map/` + `services/map/`.
- Prettier + ESLint run on commit via Husky + lint-staged.

See `README.md` for the full directory map.
