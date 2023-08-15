import { create } from "zustand";

export const useSidebarStore = create((set, get) => ({
  mobileSize: "15%",
  toggleSidebar: () => {
    const size = get().mobileSize;
    if (size === "15%") {
      return set(() => ({ mobileSize: "100%" }));
    } else {
      return set(() => ({ mobileSize: "15%" }));
    }
  },
}));
