import { create } from "zustand";

export const usePopStore = create((set) => ({
  isPopOpen: false,

  setPopOpen: () => set({ isPopOpen: true }),
  setPopClose: () => set({ isPopOpen: false }),
}));
