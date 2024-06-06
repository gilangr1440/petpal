import axiosWithConfig from "../axiosWithConfig";
import { AdminFormValues, AdminType } from "./index";

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

export const editAdmin = async (body: AdminFormValues) => {
  try {
    const address = `${body.alamat}, ${body.koordinat}`;
    const formData = new FormData();

    formData.append("full_name", body.full_name);
    formData.append("email", body.email);
    formData.append("number_phone", body.number_phone);
    formData.append("address", address);

    if (body.password) {
      formData.append("password", body.password as string);
    }

    if (body.profile_picture) {
      formData.append("profile_picture", body.profile_picture);
    }

    const response = await axiosWithConfig.put("https://zyannstore.my.id/admins", formData);
    return response;
  } catch (error: any) {
    return error.response;
  }
};
