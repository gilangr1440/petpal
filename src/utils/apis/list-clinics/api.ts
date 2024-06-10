import axiosWithConfig from "@/utils/apis/axiosWithConfig";
import { ConsultationType } from "./types";

const API_BASE_URL = "https://zyannstore.my.id/clinics";

export const getClinics = async () => {
  try {
    const response = await axiosWithConfig.get(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching clinics:", error);
    throw new Error("Failed to fetch clinics");
  }
};

export const detailClinic = async (id: string) => {
  try {
    const response = await axiosWithConfig.get(`/clinics/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const addConsultation = async (body: ConsultationType, id: number) => {
  try {
    const response = await axiosWithConfig.post(`https://zyannstore.my.id/consultations/${id}`, body);
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
