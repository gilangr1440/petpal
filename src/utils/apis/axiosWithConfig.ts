import axios from "axios";

let USER_JWT_TOKEN = "";

const axiosWithConfig = axios.create();

export const setAxiosConfig = (token: string) => {
  USER_JWT_TOKEN = token;
};

axiosWithConfig.interceptors.request.use((axiosConfig) => {
  axiosConfig.baseURL = import.meta.env.VITE_BASE_URL;
  axiosConfig.headers.Authorization = `Bearer ${USER_JWT_TOKEN}`;

  return axiosConfig;
});

export default axiosWithConfig;
