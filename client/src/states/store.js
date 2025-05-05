import { create } from "zustand";

export const useMainStore = create((set) => ({
  user: null,

  setUser: (user) => set({ user }),
}));
