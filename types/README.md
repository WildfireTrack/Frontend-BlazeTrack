# types/

**Shared, app-wide TypeScript types** — domain models and cross-cutting
contracts used by more than one feature (e.g. `Wildfire`, `LatLng`,
`MapStyleId`).

Feature-local types stay in `features/<feature>/types/`. Prefer `type` aliases
for data shapes; keep this folder free of runtime code.
