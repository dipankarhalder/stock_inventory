import { axiosInstance } from "@/services/baseConfig";
import {
  profileMeService,
  updateProfilesService,
  profilesService,
} from "@/services/routes";

/* profile service */
export const myProfile = async () => {
  const res = await axiosInstance.get(profileMeService);
  return res.data;
};

/* edit profile service */
export const editProfile = async (payload: any) => {
  try {
    const res = await axiosInstance.patch(updateProfilesService, payload);
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

/* user list service */
export const userProfiles = async () => {
  const res = await axiosInstance.get(`${profilesService}?role=all`);
  return res.data;
};
