/**
 * Centralized, typed access to public environment variables.
 *
 * Only `NEXT_PUBLIC_*` variables are exposed to the browser. Reading them through
 * this module (instead of `process.env` directly) keeps defaults in one place and
 * makes missing values easy to spot. See `.env.example`.
 */
export const env = {
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? "WildFire Tracker",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  mapStyleUrl: process.env.NEXT_PUBLIC_MAP_STYLE_URL ?? "",
  mapTilerApiKey: process.env.NEXT_PUBLIC_MAPTILER_API_KEY ?? "",
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
} as const;
