import axiosWithConfig from "../axiosWithConfig";
import { UserType, UserTypeZod } from "./types";

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

export const editUser = async (body: UserTypeZod) => {
  try {
    const formData = new FormData();

    formData.append("full_name", body.full_name);
    formData.append("email", body.email);
    formData.append("number_phone", body.number_phone);
    formData.append("address", body.address);
    formData.append("coordinate", body.coordinate);

    if (body.password) {
      formData.append("password", body.password as string);
    }

    if (body.profile_picture) {
      formData.append("profile_picture", body.profile_picture);
    }

    const response = await axiosWithConfig.patch(`https://zyannstore.my.id/users/profile`, formData);
    return response.data as { message: string };
  } catch (error: any) {
    return error.response;
  }
};
