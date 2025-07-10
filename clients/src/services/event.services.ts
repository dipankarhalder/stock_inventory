import { axiosInstance } from "@/services/baseConfig";
import { eventListService, eventService } from "@/services/routes";

/* event list service */
export const eventLists = async () => {
  const res = await axiosInstance.get(eventListService);
  return res.data;
};

/* event service */
export const getEvent = async (id: string) => {
  const res = await axiosInstance.get(`${eventService}/${id}`);
  return res.data;
};
