/**
 * Placeholder landing page for the Phase 1 foundation.
 *
 * Intentionally minimal — the wildfire dashboard (map, search, draggable
 * windows) is built on top of this scaffold in later phases.
 */

import Globe from '@/components/map/globe.tsx';

import { GetData } from '@/services/map-data/data.tsx'

export default async function HomePage() {
  const fireData = await GetData();
  console.log(fireData);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <Globe fireData={fireData} />
    </main>
  );
}
