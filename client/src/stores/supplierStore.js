import { create } from "zustand";

export const useSupplierStore = create((set) => ({
  isLoading: false,
  isSupplierData: [],

  setLoading: (loading) => set({ isLoading: loading }),
  setSupplier: (dataInfo) => set({ isSupplierData: dataInfo }),
}));
