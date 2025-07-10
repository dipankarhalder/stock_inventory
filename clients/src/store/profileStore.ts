import { create } from "zustand";

interface ProfileState {
  profile: any;
  listprofile: any;
  loading: boolean;
  setProfile: (profile: any) => void;
  setListProfile: (profile: any) => void;
  setLoading: (loading: boolean) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  listprofile: null,
  loading: false,
  setProfile: (profile) => set({ profile }),
  setListProfile: (listprofile) => set({ listprofile }),
  setLoading: (loading) => set({ loading }),
}));
