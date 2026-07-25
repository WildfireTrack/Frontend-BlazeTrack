# 🔥 WildFire Tracker

A professional, GIS-style **wildfire monitoring dashboard**. This repository
currently contains the **Phase 1 foundation** — a clean, production-ready
project scaffold. No map, application UI, or backend integration exists yet.

## Tech Stack

| Area         | Choice                                                     |
| ------------ | ---------------------------------------------------------- |
| Framework    | **Next.js 15** (App Router) + React 19                     |
| Language     | **TypeScript** (strict)                                    |
| Styling      | **Tailwind CSS v4** + **shadcn/ui** (base-nova, neutral)   |
| Server state | **@tanstack/react-query**                                  |
| Client state | **Zustand**                                                |
| Maps         | **MapLibre GL JS** via **react-map-gl**                    |
| Windows      | **react-draggable** + **Framer Motion**                    |
| Charts       | **Recharts**                                               |
| Forms        | **React Hook Form** + **Zod** (`@hookform/resolvers`)      |
| Theming      | **next-themes** (light / dark)                             |
| Icons        | **lucide-react**                                           |
| Class utils  | **clsx**, **tailwind-merge**, **class-variance-authority** |
| Tooling      | ESLint, Prettier, Husky, lint-staged, EditorConfig         |

## Getting Started

```bash
npm install
cp .env.example .env.local   # then fill in values as needed
npm run dev                  # http://localhost:3000
```

### Scripts

| Script                 | Description                       |
| ---------------------- | --------------------------------- |
| `npm run dev`          | Start the development server      |
| `npm run build`        | Production build                  |
| `npm run start`        | Serve the production build        |
| `npm run lint`         | Run ESLint                        |
| `npm run lint:fix`     | ESLint with autofix               |
| `npm run typecheck`    | Type-check with `tsc --noEmit`    |
| `npm run format`       | Format the codebase with Prettier |
| `npm run format:check` | Verify formatting without writing |

A Husky **pre-commit** hook runs `lint-staged` (ESLint + Prettier on staged
files).

## Project Structure

Enterprise-style, **feature-based** architecture. Each directory has its own
`README.md` describing its purpose in detail.

```text
wildfire-tracker/
├─ app/                 # Next.js App Router: routes, layout, global styles
├─ components/          # Shared, presentational components
│  ├─ ui/               #   shadcn/ui primitives (CLI-managed)
│  ├─ layout/           #   app shell, frames, containers
│  ├─ navbar/           #   top navigation
│  ├─ sidebar/          #   side panels
│  ├─ map/              #   map-surface components (MapLibre) — empty for now
│  └─ windows/          #   draggable info windows
├─ features/            # Self-contained vertical slices
│  ├─ wildfire/         #   wildfire data, markers, detail windows
│  ├─ search/           #   location search
│  └─ map-controls/     #   map-style switcher, zoom, layer toggles
├─ hooks/               # Global reusable React hooks
├─ services/            # Integration layer (boundary to the outside world)
│  ├─ api/              #   HTTP client + typed data access
│  └─ map/              #   MapLibre style definitions & helpers
├─ store/               # Global client state (Zustand)
├─ providers/           # React context providers (theme, query, api)
├─ types/               # Shared, app-wide TypeScript types
├─ lib/                 # Configured third-party glue (cn, env, clients)
├─ constants/           # Static app-wide constants & config
├─ utils/               # Pure, dependency-free helper functions
├─ styles/              # Supplemental global styles
└─ public/              # Static assets
   ├─ icons/
   └─ images/
```

### Architectural rules

- **Import alias:** use `@/` for all internal imports (maps to the project root).
- **Dependency direction:** `features/` may use `components/`, `services/`,
  `lib/`, `hooks/`, `store/`, `types/`, `constants/`, `utils/`. Those shared
  layers must not import from `features/`.
- **Feature isolation:** a feature never reaches into another feature's
  internals — only through its public `index.ts` barrel.
- **State ownership:** Zustand (`store/`) for global UI/client state; React Query
  for server/remote state. Never store server data in Zustand.
- **Map isolation:** keep MapLibre imports inside `components/map/` and
  `services/map/` so the mapping engine stays swappable.
- **`lib/` vs `utils/`:** `lib/` wraps/configures dependencies (may import
  libraries and hold singletons); `utils/` holds pure, side-effect-free helpers.

## Providers

Composed once in `app/layout.tsx` via `providers/app-providers.tsx`:

- **ThemeProvider** — light/dark via `next-themes` (class strategy).
- **QueryProvider** — React Query `QueryClientProvider`.
- **ApiProvider** — placeholder for future API/runtime config.

Global store (Zustand) requires no provider.

## Built for scale

The structure is prepared so the following can be added **without
restructuring**: live wildfire updates, heatmap layer, fire clustering, AI
prediction overlays, weather overlays, historical timeline playback, multiple
draggable windows, an analytics dashboard, authentication, notifications, and
WebSocket support.

## Environment Variables

See [`.env.example`](.env.example). Only `NEXT_PUBLIC_*` variables are exposed to
the browser; access them through [`lib/env.ts`](lib/env.ts). No secrets are
required for the Phase 1 foundation.
