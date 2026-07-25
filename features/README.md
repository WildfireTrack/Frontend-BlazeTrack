# features/

**Feature-based modules.** Each feature is a self-contained vertical slice that
owns its own components, hooks, state, services, and types.

Recommended per-feature layout (create folders as needed — avoid empty ones):

```
features/<feature>/
  components/   # feature-specific UI (composes components/ + components/ui)
  hooks/        # feature-specific React hooks
  api/          # data access for this feature (calls services/api)
  store/        # feature-scoped Zustand slice, if any
  types/        # feature-specific TypeScript types
  index.ts      # public surface — import features via this barrel only
```

## Rules

- Features may depend on `components/`, `services/`, `lib/`, `hooks/`, `store/`,
  `types/`, `constants/`, `utils/`.
- Features must **not** import from other features' internals — only via their
  `index.ts` public barrel. This keeps slices decoupled and easy to extract.
