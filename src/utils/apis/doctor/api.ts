import axiosWithConfig from "../axiosWithConfig";
import { DoctorFormattedData } from "./interface";

export const addDoctor = async (body: DoctorFormattedData) => {
  try {
    const formData = new FormData();

    formData.append("full_name", body.full_name);
    formData.append("about", body.about);
    formData.append("price", body.price.toString());
    formData.append("monday", body.available_days.monday.toString());
    formData.append("tuesday", body.available_days.tuesday.toString());
    formData.append("wednesday", body.available_days.wednesday.toString());
    formData.append("thursday", body.available_days.thursday.toString());
    formData.append("friday", body.available_days.friday.toString());
    formData.append("vaccinations", body.services.vaccinations.toString());
    formData.append("operations", body.services.operations.toString());
    formData.append("mcu", body.services.mcu.toString());
    formData.append("online_consultations", body.services.online_consultations.toString());

    if (body.profile_picture) {
      formData.append("profile_picture", body.profile_picture);
    }

    // for (const key in body) {
    //   const typedKey = key as keyof typeof body;
    //   if (checkProperty(body[typedKey])) {
    //     if (typedKey === "available_days" || typedKey === "services") {
    //       for (const subKey in body[typedKey]) {
    //         const typedSubKey = subKey as keyof (typeof body)[typeof typedKey];
    //         formData.append(`${key}[${subKey}]`, String(body[typedKey][typedSubKey]));
    //       }
    //     } else {
    //       formData.append(key, String(body[typedKey]));
    //     }
    //   }
    // }

    const response = await axiosWithConfig.post("http://zyannstore.my.id/doctors", formData);
    return response.data;
  } catch (error: any) {
    console.log(error.response);
  }
};

export const editDoctor = async (body: DoctorFormattedData) => {
  try {
    const formData = new FormData();

    formData.append("full_name", body.full_name);
    formData.append("about", body.about);
    formData.append("price", body.price.toString());
    formData.append("monday", body.available_days.monday.toString());
    formData.append("tuesday", body.available_days.tuesday.toString());
    formData.append("wednesday", body.available_days.wednesday.toString());
    formData.append("thursday", body.available_days.thursday.toString());
    formData.append("friday", body.available_days.friday.toString());
    formData.append("vaccinations", body.services.vaccinations.toString());
    formData.append("operations", body.services.operations.toString());
    formData.append("mcu", body.services.mcu.toString());
    formData.append("online_consultations", body.services.online_consultations.toString());

    if (body.profile_picture) {
      formData.append("profile_picture", body.profile_picture);
    }

    // for (const key in body) {
    //   const typedKey = key as keyof typeof body;
    //   if (checkProperty(body[typedKey])) {
    //     if (typedKey === "available_days" || typedKey === "services") {
    //       for (const subKey in body[typedKey]) {
    //         const typedSubKey = subKey as keyof (typeof body)[typeof typedKey];
    //         formData.append(`${key}[${subKey}]`, String(body[typedKey][typedSubKey]));
    //       }
    //     } else {
    //       formData.append(key, String(body[typedKey]));
    //     }
    //   }
    // }

    const response = await axiosWithConfig.patch("http://zyannstore.my.id/doctors", formData);
    return response.data;
  } catch (error: any) {
    console.log(error.response);
  }
};

export const getDoctor = async () => {
  try {
    const response = await axiosWithConfig.get("http://zyannstore.my.id/doctors");
    return response.data;
  } catch (error: any) {
    console.log(error.response);
  }
};
