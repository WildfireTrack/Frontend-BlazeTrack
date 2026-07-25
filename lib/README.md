# lib/

**Configured third-party integrations and singletons** — the wiring around
external libraries. Examples: the `cn()` class helper (`utils.ts`), typed
environment access (`env.ts`), and future clients (React Query client factory,
analytics, etc.).

Distinction from `utils/`:

- `lib/` = stateful/config glue around dependencies (may import libraries).
- `utils/` = pure, dependency-free helper functions.
