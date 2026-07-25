import { create } from "zustand";

/**
 * Minimal global UI store (placeholder) that establishes the Zustand pattern for
 * the app shell. Extend with window management, the selected wildfire, the active
 * map style, etc. in later phases. Zustand needs no provider — import this hook
 * directly in any client component.
 */
interface UIState {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
