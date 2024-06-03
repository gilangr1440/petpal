import axiosWithConfig from "../axiosWithConfig";
import { AdminType } from "./index";

interface getAdminPayload {
  message?: string;
  data: AdminType[];
}

export const getAdmin = async () => {
  try {
    const response = await axiosWithConfig.get("/admins");
    return response as getAdminPayload;
  } catch (error: any) {
    return error.response;
  }
};
