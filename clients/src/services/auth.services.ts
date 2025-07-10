import { axiosInstance } from "@/services/baseConfig";
import { IUserSignin, IUserRequest } from "@/interface";
import {
  loginService,
  registerService,
  logoutService,
} from "@/services/routes";

/* signin service */
export const loginUser = async (payload: IUserSignin) => {
  try {
    const res = await axiosInstance.post(loginService, payload);
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

/* signup service */
export const registerUser = async (payload: IUserRequest) => {
  try {
    const res = await axiosInstance.post(registerService, payload);
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

/* signout service */
export const logoutUser = async () => {
  try {
    const res = await axiosInstance.post(logoutService);
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};
