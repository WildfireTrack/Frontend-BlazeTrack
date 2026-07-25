# components/

Reusable, **presentational** React components shared across the app.

Organized by UI area so no single folder becomes a dumping ground:

| Folder     | Responsibility                                                       |
| ---------- | -------------------------------------------------------------------- |
| `ui/`      | shadcn/ui primitives (Button, Dialog, …). Managed by the shadcn CLI. |
| `layout/`  | App shell: page frames, grids, containers, providers mount points.   |
| `navbar/`  | Top navigation bar and its sub-parts.                                |
| `sidebar/` | Side panels / collapsible navigation.                                |
| `map/`     | Map-surface presentational components (markers, overlays, popups).   |
| `windows/` | Draggable desktop-style information windows.                         |

## Conventions

- Components here should be **stateless / props-driven** where possible.
- Feature-specific composition lives in `features/`, not here.
- One component per file, `PascalCase.tsx`. Co-locate styles/tests beside it.
- Do **not** import from `features/` — dependencies flow `features → components`, never the reverse.
