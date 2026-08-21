/** A single NASA FIRMS wildfire detection mapped for map display. */
export interface WildfireDetection {
  id: string;
  latitude: number;
  longitude: number;
  frp?: number;
  confidence?: string;
  brightTi4?: number;
  brightTi5?: number;
  scan?: number;
  track?: number;
  acqDate?: string;
  acqTime?: number;
  satellite?: string;
  instrument?: string;
  version?: string;
  dayNight?: string;
}
