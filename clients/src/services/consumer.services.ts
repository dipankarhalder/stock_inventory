import { axiosInstance } from "@/services/baseConfig";
import { consumerAddService, consumerListService, consumerProfileService } from "@/services/routes";

/* consumer list service */
export const consumerLists = async () => {
  const res = await axiosInstance.get(consumerListService);
  return res.data;
};

/* add new consumer service */
export const addNewConsumer = async (payload: any) => {
  try {
    const res = await axiosInstance.post(consumerAddService, payload);
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

/* edit consumer service */
export const editCustomer = async (id: string, payload: any) => {
  try {
    const res = await axiosInstance.patch(`${consumerProfileService}/${id}`, payload);
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

/* delete consumer service */
export const deleteConsumer = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`${consumerProfileService}/${id}`);
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};
