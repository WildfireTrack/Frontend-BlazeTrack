# store/

**Global client state** via **Zustand**. Use for cross-cutting UI state that
many features read/write: open draggable windows, selected wildfire, active map
style, sidebar open/closed, theme-adjacent UI flags.

- Zustand stores are plain hooks — **no React Provider is required**. Import a
  store hook anywhere (`const style = useMapStore((s) => s.style)`).
- Prefer small, focused stores (or slices) over one giant store.
- Server/remote state does **not** belong here — that is React Query's job.

Feature-only state should live in `features/<feature>/store/`.
