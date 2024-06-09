import axiosWithConfig from "../axiosWithConfig";
import { DoctorFormattedData } from "./interface";

export const addDoctor = async (body: DoctorFormattedData) => {
  try {
    const formData = new FormData();

    formData.append("full_name", body.full_name);
    formData.append("about", body.about);
    formData.append("price", body.price.toString());
    formData.append("available_days[monday]", body.available_days.monday.toString());
    formData.append("available_days[tuesday]", body.available_days.tuesday.toString());
    formData.append("available_days[wednesday]", body.available_days.wednesday.toString());
    formData.append("available_days[thursday]", body.available_days.thursday.toString());
    formData.append("available_days[friday]", body.available_days.friday.toString());
    formData.append("services[vaccinations]", body.services.vaccinations.toString());
    formData.append("services[operations]", body.services.operations.toString());
    formData.append("services[mcu]", body.services.mcu.toString());

    if (body.profile_picture) {
      formData.append("profile_picture", body.profile_picture);
    }

    const response = await axiosWithConfig.post("https://zyannstore.my.id/doctors", formData);
    return response.data;
  } catch (error: any) {
    console.log(error.response);
  }
};

export const getDoctor = async () => {
  try {
    const response = await axiosWithConfig.get("https://zyannstore.my.id/doctors");
    return response.data;
  } catch (error: any) {
    console.log(error.response);
  }
};
