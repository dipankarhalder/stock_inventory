import { create } from "zustand";

interface EventState {
  listEvents: any;
  getEvent: any;
  setListEvents: (event: any) => void;
  setTheEvent: (event: any) => void;
}

export const useEventStore = create<EventState>((set) => ({
  listEvents: null,
  getEvent: null,
  setListEvents: (listEvents) => set({ listEvents }),
  setTheEvent: (getEvent) => set({ getEvent }),
}));
