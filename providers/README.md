# providers/

**React context providers** composed once at the app root (`app/layout.tsx`).

| File                 | Purpose                                                      |
| -------------------- | ------------------------------------------------------------ |
| `theme-provider.tsx` | Light/Dark theme via **next-themes** (class strategy).       |
| `query-provider.tsx` | **React Query** `QueryClientProvider` + client factory.      |
| `api-provider.tsx`   | Placeholder for a future API/runtime-config context.         |
| `app-providers.tsx`  | Composes all providers; wraps `children` in the root layout. |

Notes:

- **Global store** uses Zustand, which needs no provider — see `store/`.
- Providers set up structure only; no business logic lives here.
