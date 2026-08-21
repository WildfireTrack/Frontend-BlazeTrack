// "use client";

// import { useEffect, useMemo, useRef } from "react";
// import { useQuery } from "@tanstack/react-query";
// import {
//   FullscreenControl, So every single edge for example this one is always gonna go in actually the graph that we're given does not have any cycles but we introduce one additional edge so it's not like gonna be a self loop they tell us that by assessing that it has two different vertices they specifically tell us that we want to return the edge that can now be one trillion dollars
//   Map,
//   NavigationControl,
//   Popup,
//   ScaleControl,
//   setWorkerUrl,
//   type GeoJSONSource,
//   type MapGeoJSONFeature,
// } from "maplibre-gl";
// import "maplibre-gl/dist/maplibre-gl.css";

// import { DEFAULT_MAP_VIEW } from "@/constants";
// import { SATELLITE_MAP_STYLE } from "@/services/map/map-styles";
// import {
//   createWildfireFeatureCollection,
//   type WildfireDetection,
// } from "@/services/map/wildfires";
// import { getWildfireDetections } from "@/services/api/wildfires";

// setWorkerUrl("/maplibre-gl-worker.mjs");

// const WILDFIRE_SOURCE_ID = "wildfire-detections";
// const WILDFIRE_ICON_ID = "wildfire-flame";

// function createWildfireIcon(size = 96): ImageData {
//   const canvas = document.createElement("canvas");
//   canvas.width = size;
//   canvas.height = size;

//   const context = canvas.getContext("2d");

//   if (!context) {
//     return new ImageData(size, size);
//   }

//   const gradient = context.createRadialGradient(
//     size * 0.5,
//     size * 0.58,
//     size * 0.08,
//     size * 0.5,
//     size * 0.58,
//     size * 0.42,
//   );
//   gradient.addColorStop(0, "#fff7ad");
//   gradient.addColorStop(0.36, "#ff9f1c");
//   gradient.addColorStop(0.76, "#ef233c");
//   gradient.addColorStop(1, "rgba(239, 35, 60, 0)");

//   context.fillStyle = "rgba(0, 0, 0, 0.35)";
//   context.beginPath();
//   context.ellipse(
//     size * 0.5,
//     size * 0.78,
//     size * 0.24,
//     size * 0.09,
//     0,
//     0,
//     Math.PI * 2,
//   );
//   context.fill();

//   context.fillStyle = gradient;
//   context.beginPath();
//   context.moveTo(size * 0.5, size * 0.08);
//   context.bezierCurveTo(
//     size * 0.86,
//     size * 0.38,
//     size * 0.73,
//     size * 0.74,
//     size * 0.5,
//     size * 0.86,
//   );
//   context.bezierCurveTo(
//     size * 0.25,
//     size * 0.74,
//     size * 0.1,
//     size * 0.46,
//     size * 0.42,
//     size * 0.22,
//   );
//   context.bezierCurveTo(
//     size * 0.38,
//     size * 0.42,
//     size * 0.62,
//     size * 0.44,
//     size * 0.5,
//     size * 0.08,
//   );
//   context.closePath();
//   context.fill();

//   context.fillStyle = "#fff3a3";
//   context.beginPath();
//   context.moveTo(size * 0.5, size * 0.34);
//   context.bezierCurveTo(
//     size * 0.66,
//     size * 0.51,
//     size * 0.61,
//     size * 0.72,
//     size * 0.5,
//     size * 0.77,
//   );
//   context.bezierCurveTo(
//     size * 0.36,
//     size * 0.68,
//     size * 0.36,
//     size * 0.51,
//     size * 0.5,
//     size * 0.34,
//   );
//   context.fill();

//   return context.getImageData(0, 0, size, size);
// }

// function formatAcquisitionTime(detection: WildfireDetection) {
//   const time = detection.acquisitionTimeUtc.padStart(4, "0");

//   return `${detection.acquisitionDate} ${time.slice(0, 2)}:${time.slice(2)} UTC`;
// }

// function getPointCoordinates(feature: MapGeoJSONFeature): [number, number] {
//   const geometry = feature.geometry;

//   if (geometry.type !== "Point") {
//     return [DEFAULT_MAP_VIEW.longitude, DEFAULT_MAP_VIEW.latitude];
//   }

//   return geometry.coordinates as [number, number];
// }

// function escapeHtml(value: string) {
//   return value.replace(/[&<>"']/g, (character) => {
//     const entities: Record<string, string> = {
//       "&": "&amp;",
//       "<": "&lt;",
//       ">": "&gt;",
//       '"': "&quot;",
//       "'": "&#39;",
//     };

//     return entities[character] ?? character;
//   });
// }

// export default function MapComponent() {
//   const {
//     data: detections = [],
//     isError,
//     isFetching,
//   } = useQuery({
//     queryKey: ["wildfire-detections"],
//     queryFn: ({ signal }) => getWildfireDetections(signal),
//     refetchInterval: 60_000,
//   });
//   const mapContainer = useRef<HTMLDivElement>(null);
//   const map = useRef<Map | null>(null);
//   const popup = useRef<Popup | null>(null);
//   const wildfireData = useMemo(
//     () => createWildfireFeatureCollection(detections),
//     [detections],
//   );
//   const wildfireDataRef = useRef(wildfireData);

//   wildfireDataRef.current = wildfireData;

//   useEffect(() => {
//     if (!mapContainer.current || map.current) return;

//     map.current = new Map({
//       container: mapContainer.current,
//       style: SATELLITE_MAP_STYLE,
//       center: [DEFAULT_MAP_VIEW.longitude, DEFAULT_MAP_VIEW.latitude],
//       zoom: DEFAULT_MAP_VIEW.zoom,
//       // attributionControl: { compact: true },
//     });

//     map.current.addControl(new NavigationControl(), "top-right");
//     map.current.addControl(new FullscreenControl(), "top-right");
//     map.current.addControl(new ScaleControl({ unit: "metric" }), "bottom-left");

//     map.current.on("load", () => {
//       const currentMap = map.current;

//       if (!currentMap) return;

//       currentMap.setProjection({
//         type: "globe",
//       });

//       currentMap.addSource("esri-satellite", {
//         type: "raster",
//         tiles: [
//           "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
//         ],
//         tileSize: 256,
//         maxzoom: 19,
//       });

//       currentMap.addLayer({
//         id: "esri-satellite",
//         type: "raster",
//         source: "esri-satellite",
//       });

//       if (!currentMap.hasImage(WILDFIRE_ICON_ID)) {
//         currentMap.addImage(WILDFIRE_ICON_ID, createWildfireIcon(), {
//           pixelRatio: 2,
//         });
//       }

//       currentMap.addSource(WILDFIRE_SOURCE_ID, {
//         type: "geojson",
//         data: wildfireDataRef.current,
//         cluster: true,
//         clusterMaxZoom: 8,
//         clusterRadius: 44,
//       });

//       currentMap.addLayer({
//         id: "wildfire-clusters",
//         type: "circle",
//         source: WILDFIRE_SOURCE_ID,
//         filter: ["has", "point_count"],
//         paint: {
//           "circle-color": [
//             "step",
//             ["get", "point_count"],
//             "#ffb703",
//             5,
//             "#fb8500",
//             12,
//             "#d90429",
//           ],
//           "circle-radius": ["step", ["get", "point_count"], 18, 5, 24, 12, 32],
//           "circle-stroke-color": "#fff7ad",
//           "circle-stroke-width": 2,
//           "circle-opacity": 0.92,
//         },
//       });

//       currentMap.addLayer({
//         id: "wildfire-heat-pulse",
//         type: "circle",
//         source: WILDFIRE_SOURCE_ID,
//         filter: ["!", ["has", "point_count"]],
//         paint: {
//           "circle-color": "#ef233c",
//           "circle-radius": [
//             "interpolate",
//             ["linear"],
//             ["get", "frpMegawatts"],
//             10,
//             14,
//             90,
//             30,
//           ],
//           "circle-blur": 0.55,
//           "circle-opacity": 0.45,
//         },
//       });

//       currentMap.addLayer({
//         id: "wildfire-icons",
//         type: "symbol",
//         source: WILDFIRE_SOURCE_ID,
//         filter: ["!", ["has", "point_count"]],
//         layout: {
//           "icon-image": WILDFIRE_ICON_ID,
//           "icon-size": [
//             //testing git work
//             "interpolate",
//             ["linear"],
//             ["get", "frpMegawatts"],
//             10,
//             0.36,
//             90,
//             0.58,
//           ],
//           "icon-allow-overlap": true,
//           "icon-anchor": "bottom",
//         },
//       });

//       currentMap.on("click", "wildfire-clusters", async (event) => {
//         const feature = event.features?.[0];
//         const clusterId = feature?.properties?.cluster_id;
//         const source = currentMap.getSource(
//           WILDFIRE_SOURCE_ID,
//         ) as GeoJSONSource;

//         if (clusterId == null || !feature) return;

//         const zoom = await source.getClusterExpansionZoom(clusterId);
//         const coordinates = getPointCoordinates(feature);

//         currentMap.easeTo({
//           center: coordinates,
//           zoom,
//           duration: 500,
//         });
//       });

//       currentMap.on("click", "wildfire-icons", (event) => {
//         const feature = event.features?.[0];
//         const properties = feature?.properties as WildfireDetection | undefined;

//         if (!feature || !properties) return;

//         const coordinates = getPointCoordinates(feature);
//         const safePlace = escapeHtml(properties.placeLabel);

//         popup.current?.remove();
//         popup.current = new Popup({ closeButton: true, closeOnClick: true })
//           .setLngLat(coordinates)
//           .setHTML(
//             `<div class="space-y-1">
//               <strong>${safePlace}</strong>
//               <span>Confidence: ${escapeHtml(properties.confidence)}</span>
//               <span>FRP: ${properties.frpMegawatts} MW</span>
//               <span>Brightness: ${properties.brightnessKelvin} K</span>
//               <span>${escapeHtml(properties.satellite)} ${escapeHtml(properties.instrument)}</span>
//               <span>${formatAcquisitionTime(properties)}</span>
//             </div>`,
//           )
//           .addTo(currentMap);
//       });

//       currentMap.on("mouseenter", "wildfire-icons", () => {
//         currentMap.getCanvas().style.cursor = "pointer";
//       });
//       currentMap.on("mouseleave", "wildfire-icons", () => {
//         currentMap.getCanvas().style.cursor = "";
//       });
//       currentMap.on("mouseenter", "wildfire-clusters", () => {
//         currentMap.getCanvas().style.cursor = "pointer";
//       });
//       currentMap.on("mouseleave", "wildfire-clusters", () => {
//         currentMap.getCanvas().style.cursor = "";
//       });
//     });

//     return () => {
//       popup.current?.remove();
//       popup.current = null;
//       map.current?.remove();
//       map.current = null;
//     };
//   }, []);

//   useEffect(() => {
//     const source = map.current?.getSource(WILDFIRE_SOURCE_ID) as
//       GeoJSONSource | undefined;

//     if (!source) return;

//     source.setData(wildfireData);
//   }, [wildfireData]);

//   return (
//     <section className="relative h-dvh w-full overflow-hidden bg-black">
//       <div ref={mapContainer} className="h-full w-full" />
//       <div className="pointer-events-none absolute top-4 left-4 max-w-xs rounded-md border border-white/15 bg-black/70 px-4 py-3 text-left text-white shadow-lg backdrop-blur">
//         <p className="text-xs font-medium tracking-[0.18em] text-orange-200 uppercase">
//           Satellite Fire View
//         </p>
//         <h1 className="mt-1 text-xl font-semibold">WildFire Tracker</h1>
//         <p className="mt-1 text-sm text-white/75">
//           {isError
//             ? "Unable to load live wildfire detections."
//             : isFetching
//               ? "Refreshing live wildfire detections..."
//               : `${detections.length.toLocaleString()} live wildfire detections`}
//         </p>
//       </div>
//     </section>
//   );
// }
