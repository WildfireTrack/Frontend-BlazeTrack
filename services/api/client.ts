import { env } from "@/lib/env";

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
