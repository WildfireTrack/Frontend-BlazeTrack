"use client";

import type { ReactNode } from "react";

import { ApiProvider } from "@/providers/api-provider";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";

/**
 * Composes all app-wide providers in one place. Mounted once at the root layout.
 * Order: Theme (outermost) → React Query → API context.
 * Global client state uses Zustand, which needs no provider (see `store/`).
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryProvider>
        <ApiProvider>{children}</ApiProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
