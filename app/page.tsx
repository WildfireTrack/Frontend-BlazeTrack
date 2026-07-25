/**
 * Placeholder landing page for the Phase 1 foundation.
 *
 * Intentionally minimal — the wildfire dashboard (map, search, draggable
 * windows) is built on top of this scaffold in later phases.
 */
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <span className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
        Phase 1 · Foundation
      </span>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        WildFire Tracker
      </h1>
      <p className="max-w-md text-balance text-muted-foreground">
        Project scaffolding is ready. The wildfire monitoring dashboard — map,
        search, and draggable information windows — will be built on top of this
        foundation.
      </p>
    </main>
  );
}
