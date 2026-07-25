# services/map/

Map-engine integration for **MapLibre GL**: base style definitions (Light, Dark,
Satellite, Terrain), and helpers for camera movement, bounds, and layer setup.

Isolating MapLibre here (plus `components/map/`) keeps the rest of the app
independent of the mapping library. No styles are defined yet.
