import axiosWithConfig from "../axiosWithConfig";
import { UserType } from "./types";

interface getUserPayload {
  message?: string;
  data: UserType;
}

export const getUser = async () => {
  try {
    const response = await axiosWithConfig.get("/users/profile");
    return response as getUserPayload;
  } catch (error: any) {
    return error.response;
  }
};
