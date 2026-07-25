import { env } from "@/lib/env";
import type { MapStyleId } from "@/types";

/** App metadata. */
export const APP_NAME = env.appName;
export const APP_DESCRIPTION =
  "Professional wildfire monitoring dashboard — track active wildfires on an interactive world map.";

/** Default map camera (world view). Used when the map is added in a later phase. */
export const DEFAULT_MAP_VIEW = {
  longitude: 0,
  latitude: 20,
  zoom: 1.5,
} as const;

/** Base map styles surfaced in the map-style switcher. */
export const MAP_STYLE_IDS: readonly MapStyleId[] = [
  "light",
  "dark",
  "satellite",
  "terrain",
];
