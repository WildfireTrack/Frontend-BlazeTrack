# services/

**Integration layer** — the boundary between the app and the outside world
(HTTP APIs, the mapping engine, websockets, etc.). Keeps third-party details out
of components and features.

| Folder | Responsibility                                                        |
| ------ | --------------------------------------------------------------------- |
| `api/` | HTTP client + typed data-access functions (wildfire data, geocoding). |
| `map/` | MapLibre style definitions and map-engine helpers.                    |

Services expose plain, typed functions. React Query (in `features/*/api` or
`hooks/`) calls into these; components never call services directly.
