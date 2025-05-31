import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isLoading: false,
  isToken: localStorage.getItem("token") || null,

  setLoading: (loading) => set({ isLoading: loading }),
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ isToken: token });
  },
}));
