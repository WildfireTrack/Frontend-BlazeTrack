# constants/

**Static, app-wide constants and configuration** — non-secret values that never
change at runtime: app metadata, map defaults (initial center/zoom), map-style
ids, route paths, query keys, z-index scales.

Secrets and environment-specific values belong in env vars (`lib/env.ts`), not
here.
