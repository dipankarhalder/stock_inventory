import { create } from "zustand";

interface AuthState {
  isToken: string | null;
  isLogin: string | null;
  loading: boolean;
  setToken: (token: string) => void;
  setLogin: (login: string) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isToken: localStorage.getItem("isToken") || null,
  isLogin: localStorage.getItem("isLogin") || null,
  loading: false,
  setToken: (token) => {
    localStorage.setItem("isToken", token);
    set({ isToken: token });
  },
  setLogin: (login) => {
    localStorage.setItem("isLogin", login);
    set({ isLogin: login });
  },
  setLoading: (loading) => set({ loading }),
  logout: () => {
    localStorage.clear();
    set({ isToken: null });
  },
}));
