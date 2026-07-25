"use client";

import { createContext, useContext, type ReactNode } from "react";

/**
 * Placeholder for a future API / runtime-config context (base URL, auth token,
 * feature flags). No backend is wired in Phase 1 — this only reserves the
 * structure so it can be filled in later without touching call sites.
 */
type ApiContextValue = Record<string, never>;

const ApiContext = createContext<ApiContextValue | null>(null);

export function ApiProvider({ children }: { children: ReactNode }) {
  return <ApiContext.Provider value={{}}>{children}</ApiContext.Provider>;
}

export function useApiContext(): ApiContextValue {
  const ctx = useContext(ApiContext);
  if (!ctx) {
    throw new Error("useApiContext must be used within <ApiProvider>.");
  }
  return ctx;
}
