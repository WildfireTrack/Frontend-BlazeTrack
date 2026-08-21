"use client";

import {
  formatAcquisitionTime,
  formatConfidence,
  formatCoordinates,
  formatDayNight,
} from "@/lib/wildfire/format";
import type { WildfireDetection } from "@/types/wildfire";

interface FirePopupProps {
  fire: WildfireDetection;
  onClose: () => void;
}

export default function FirePopup({ fire, onClose }: FirePopupProps) {
  return (
    <div className="w-72 rounded-lg border border-white/15 bg-black/85 p-4 text-sm text-white shadow-xl backdrop-blur">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-orange-300 uppercase">
            Active Detection
          </p>
          <h2 className="mt-1 text-base font-semibold">Wildfire Hotspot</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded px-1.5 py-0.5 text-lg leading-none text-white/60 transition hover:bg-white/10 hover:text-white"
          aria-label="Close fire details"
        >
          ×
        </button>
      </div>

      <dl className="space-y-2">
        <div className="flex justify-between gap-4">
          <dt className="text-white/60">Location</dt>
          <dd className="text-right font-medium">{formatCoordinates(fire)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-white/60">Confidence</dt>
          <dd className="font-medium">{formatConfidence(fire.confidence)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-white/60">FRP</dt>
          <dd className="font-medium">
            {fire.frp != null ? `${fire.frp.toFixed(1)} MW` : "N/A"}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-white/60">Brightness (TI4)</dt>
          <dd className="font-medium">
            {fire.brightTi4 != null ? `${fire.brightTi4.toFixed(1)} K` : "N/A"}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-white/60">Satellite</dt>
          <dd className="font-medium">
            {[fire.satellite, fire.instrument].filter(Boolean).join(" · ") ||
              "N/A"}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-white/60">Acquired</dt>
          <dd className="text-right font-medium">
            {formatAcquisitionTime(fire)}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-white/60">Day / Night</dt>
          <dd className="font-medium">{formatDayNight(fire.dayNight)}</dd>
        </div>
      </dl>
    </div>
  );
}
