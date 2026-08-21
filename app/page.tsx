"use client";

import { useCallback, useEffect, useState } from "react";
import Globe from "@/components/map/globe";
import { parseWildfireApiResponse } from "@/lib/wildfire/parse-response";
import type { WildfireDetection } from "@/types/wildfire";

const WILDFIRE_API_URL = "https://backend-blazetrack.fastapicloud.dev/api/v1/";
const REFRESH_INTERVAL_MS = 60_000;

export default function HomePage() {
  const [fireData, setFireData] = useState<WildfireDetection[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadFireData = useCallback(async (isInitialLoad: boolean) => {
    if (isInitialLoad) {
      setLoading(true);
    } else {
      setRefreshing(true);
    }

    try {
      const response = await fetch(WILDFIRE_API_URL, { cache: "no-store" });

      if (!response.ok) {
        throw new Error(
          `Failed to load fire data: ${response.status} ${response.statusText}`,
        );
      }

      const result = await response.json();
      const fires = parseWildfireApiResponse(result);

      setFireData(fires);
      setError(null);
    } catch (fetchError) {
      console.error("Wildfire fetch error:", fetchError);
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Failed to load fire data.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadFireData(true);

    const intervalId = window.setInterval(() => {
      void loadFireData(false);
    }, REFRESH_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [loadFireData]);

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-black">
      <Globe fireData={fireData} />

      <div className="pointer-events-none absolute top-4 left-4 max-w-xs rounded-md border border-white/15 bg-black/70 px-4 py-3 text-left text-white shadow-lg backdrop-blur">
        <p className="text-xs font-medium tracking-[0.18em] text-orange-200 uppercase">
          Live Fire View
        </p>
        <h1 className="mt-1 text-xl font-semibold">BlazeTrack</h1>
        <p className="mt-1 text-sm text-white/75">
          {loading
            ? "Loading live wildfire detections..."
            : error
              ? error
              : refreshing
                ? `Refreshing ${fireData.length.toLocaleString()} detections...`
                : `${fireData.length.toLocaleString()} live wildfire detections`}
        </p>
        {!loading && !error ? (
          <p className="mt-1 text-xs text-white/55">
            Click a marker to view fire details.
          </p>
        ) : null}
      </div>
    </main>
  );
}
