import { createStore } from "zustand/vanilla";
import { devtools } from "zustand/middleware";
import type { UserRole } from "@/api";

type UserStore = {
  user: null | UserRole["role"];
  setUser: (user: UserRole["role"]) => void;
};

/**
 * @description Create user vanilla store to use outside react
 */
export const userStore = createStore<UserStore, [["zustand/devtools", never]]>(
  devtools(
    (set) => ({
      user: null,
      setUser: (user) => set({ user: user }),
    }),
    { name: "userStore", store: "user", type: "user" },
  ),
);
