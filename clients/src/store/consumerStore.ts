import { create } from "zustand";

interface ConsumerState {
  listConsumer: any;
  addConsumer: any;
  updateConsumer: any;
  deleteCustomer: any;
  addFormPop: boolean;
  deletePop: boolean;
  loading: boolean;
  setNewConsumer: (consumer: any) => void;
  setUpdateConsumer: (consumer: any) => void;
  setDeleteConsumer: (consumer: any) => void;
  setListConsumer: (consumer: any) => void;
  setToggleConsPopup: (addFormPop: boolean) => void;
  setDeleteTogglePopup: (addFormPop: boolean) => void;
  setLoading: (loading: boolean) => void;
}

export const useConsumerStore = create<ConsumerState>((set) => ({
  listConsumer: null,
  addConsumer: null,
  updateConsumer: null,
  deleteCustomer: null,
  loading: false,
  addFormPop: false,
  deletePop: false,
  setNewConsumer: (addConsumer) => set({ addConsumer }),
  setUpdateConsumer: (updateConsumer) => set({ updateConsumer }),
  setDeleteConsumer: (deleteCustomer) => set({ deleteCustomer }),
  setListConsumer: (listConsumer) => set({ listConsumer }),
  setToggleConsPopup: (addFormPop) => set({ addFormPop }),
  setDeleteTogglePopup: (deletePop) => set({ deletePop }),
  setLoading: (loading) => set({ loading }),
}));
