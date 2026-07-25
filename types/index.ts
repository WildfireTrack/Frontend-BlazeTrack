/**
 * Shared, app-wide domain types. Feature-specific types belong in
 * `features/<feature>/types`. Keep this file free of runtime code.
 */

/** A geographic coordinate (WGS84). */
export interface LatLng {
  latitude: number;
  longitude: number;
}

/** Identifier for a selectable base map style. */
export type MapStyleId = "light" | "dark" | "satellite" | "terrain";
