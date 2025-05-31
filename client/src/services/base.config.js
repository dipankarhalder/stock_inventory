import axios from "axios";
import { baseUrl } from "./endpoints";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const status = error.response && error.response.status;
    if (status === 401 || status === 403) {
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
