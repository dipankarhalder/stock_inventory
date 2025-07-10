import { create } from "zustand";

interface TransactionState {
  listTransactions: any;
  getTransaction: any;
  setListTransactions: (trans: any) => void;
  setTheTransaction: (trans: any) => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  listTransactions: null,
  getTransaction: null,
  setListTransactions: (listTransactions) => set({ listTransactions }),
  setTheTransaction: (getTransaction) => set({ getTransaction }),
}));
