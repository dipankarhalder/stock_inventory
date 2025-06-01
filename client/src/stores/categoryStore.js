import { create } from "zustand";

export const useCategoryStore = create((set) => ({
  isLoading: false,
  isCategoryData: [],

  setLoading: (loading) => set({ isLoading: loading }),
  setCategory: (dataInfo) => set({ isCategoryData: dataInfo }),
}));
