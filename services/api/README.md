# services/api/

HTTP data-access layer. Houses the shared fetch client and typed request
functions for wildfire data, geocoding, and future endpoints.

No backend is connected in Phase 1 — `client.ts` is a thin placeholder wrapper.
Consume these functions through **React Query** so caching, retries, and loading
state are handled consistently. Ready to extend for live updates and WebSockets.
