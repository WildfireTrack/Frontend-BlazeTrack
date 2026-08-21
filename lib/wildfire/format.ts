import type { WildfireDetection } from "@/types/wildfire";

const CONFIDENCE_LABELS: Record<string, string> = {
  h: "High",
  n: "Nominal",
  l: "Low",
};

export function formatConfidence(confidence?: string): string {
  if (!confidence) return "Unknown";
  return (
    CONFIDENCE_LABELS[confidence.toLowerCase()] ?? confidence.toUpperCase()
  );
}

export function formatDayNight(dayNight?: string): string {
  if (!dayNight) return "Unknown";
  return dayNight.toUpperCase() === "D" ? "Day" : "Night";
}

export function formatAcquisitionTime(fire: WildfireDetection): string {
  if (!fire.acqDate) return "Unknown";

  if (fire.acqTime == null) {
    return fire.acqDate;
  }

  const time = String(Math.trunc(fire.acqTime)).padStart(4, "0");
  return `${fire.acqDate} ${time.slice(0, 2)}:${time.slice(2)} UTC`;
}

export function formatCoordinates(fire: WildfireDetection): string {
  return `${fire.latitude.toFixed(4)}°, ${fire.longitude.toFixed(4)}°`;
}
