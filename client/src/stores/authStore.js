import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isLoading: false,
  isRole: localStorage.getItem("role") || null,
  isToken: localStorage.getItem("token") || null,

  setLoading: (loading) => set({ isLoading: loading }),
  setRole: (role) => {
    localStorage.setItem("role", role);
    set({ isRole: role });
  },
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ isToken: token });
  },
  logout: () => {
    localStorage.clear();
    window.location.href = "/";
  },
}));
