import { create } from "zustand";

type UseSidebarStore = {
  isOpen: boolean;
  toggleSidebar: () => void;
  openSideBar: () => void;
  closeSideBar: () => void;
};

export const useSidebarStore = create<UseSidebarStore>()((set) => ({
  isOpen: window.innerWidth >= 768,
  toggleSidebar: () => {
    set((state) => ({ isOpen: !state.isOpen }));
  },
  openSideBar: () => {
    set(() => ({ isOpen: true }));
  },
  closeSideBar: () => {
    set(() => ({ isOpen: false }));
  },
}));
