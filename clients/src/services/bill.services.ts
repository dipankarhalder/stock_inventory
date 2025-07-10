import { axiosInstance } from "@/services/baseConfig";
import { transactionListService, transactionService } from "@/services/routes";

/* transaction list service */
export const transactionLists = async () => {
  const res = await axiosInstance.get(transactionListService);
  return res.data;
};

/* transaction service */
export const getTransaction = async (id: string) => {
  const res = await axiosInstance.get(`${transactionService}/${id}`);
  return res.data;
};
