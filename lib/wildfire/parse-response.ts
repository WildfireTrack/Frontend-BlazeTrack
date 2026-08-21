import type { WildfireDetection } from "@/types/wildfire";

type ColumnarData = Record<string, Record<string, unknown>>;

interface ParsedApiPayload {
  data?: ColumnarData;
}

interface ApiResponse {
  data?: string | ParsedApiPayload;
}

function readColumnValue(
  column: Record<string, unknown> | unknown[] | undefined,
  id: string,
): unknown {
  if (column == null) return undefined;

  if (Array.isArray(column)) {
    return column[Number(id)];
  }

  return column[id];
}

function readNumber(value: unknown): number | undefined {
  if (value == null) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function readString(value: unknown): string | undefined {
  if (value == null) return undefined;
  return String(value);
}

/** Parse the backend FIRMS columnar payload into flat detection records. */
export function parseWildfireApiResponse(result: unknown): WildfireDetection[] {
  const outer = result as ApiResponse;
  const parsed: ParsedApiPayload =
    typeof outer.data === "string"
      ? (JSON.parse(outer.data) as ParsedApiPayload)
      : (outer.data ?? {});

  const columns = parsed.data;
  if (!columns) return [];

  const latitudeData = columns.latitude;
  const longitudeData = columns.longitude;
  if (!latitudeData || !longitudeData) return [];

  const ids = Object.keys(latitudeData);

  return ids.flatMap((id) => {
    const latitude = readNumber(readColumnValue(latitudeData, id));
    const longitude = readNumber(readColumnValue(longitudeData, id));

    if (latitude == null || longitude == null) {
      return [];
    }

    return [
      {
        id,
        latitude,
        longitude,
        frp: readNumber(readColumnValue(columns.frp, id)),
        confidence: readString(readColumnValue(columns.confidence, id)),
        brightTi4: readNumber(readColumnValue(columns.bright_ti4, id)),
        brightTi5: readNumber(readColumnValue(columns.bright_ti5, id)),
        scan: readNumber(readColumnValue(columns.scan, id)),
        track: readNumber(readColumnValue(columns.track, id)),
        acqDate: readString(readColumnValue(columns.acq_date, id)),
        acqTime: readNumber(readColumnValue(columns.acq_time, id)),
        satellite: readString(readColumnValue(columns.satellite, id)),
        instrument: readString(readColumnValue(columns.instrument, id)),
        version: readString(readColumnValue(columns.version, id)),
        dayNight: readString(readColumnValue(columns.daynight, id)),
      },
    ];
  });
}
