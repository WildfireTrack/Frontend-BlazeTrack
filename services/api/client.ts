import { env } from "@/lib/env";

/**
 * Thin placeholder HTTP client. No backend is connected in Phase 1.
 *
 * Typed request helpers (wildfire data, geocoding, …) will be built on top of
 * this and consumed via React Query so caching/retries stay consistent.
 */
export const apiClient = {
  baseUrl: env.apiBaseUrl,

  async get<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${env.apiBaseUrl}${path}`, {
      ...init,
      headers: { Accept: "application/json", ...init?.headers },
    });

    if (!res.ok) {
      throw new Error(`Request failed: ${res.status} ${res.statusText}`);
    }

    return res.json() as Promise<T>;
  },
};
