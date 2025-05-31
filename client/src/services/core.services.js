import { axiosInstance } from "./base.config";

export const postServices = async (url, payload) => {
  try {
    const res = await axiosInstance.post(url, payload);
    return {
      success: true,
      data: res.data,
      status: res.status,
    };
  } catch (error) {
    return {
      success: false,
      data: (error.response && error.response.data) || {
        message: "Unknown error",
      },
      status: (error.response && error.response.status) || 500,
    };
  }
};
