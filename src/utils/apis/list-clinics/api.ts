import axiosWithConfig, { setAxiosConfig } from "@/utils/apis/axiosWithConfig";
import { Clinic } from "@/utils/apis/list-clinics/types";
import { clinicSchema } from "@/utils/apis/list-clinics/schema";

const API_BASE_URL = "https://zyannstore.my.id/clinics";

export const getClinics = async (token: string): Promise<Clinic[]> => {
  try {
    
    setAxiosConfig(token);

    const response = await axiosWithConfig.get(`${API_BASE_URL}/clinics`);
    const clinics = response.data;
    console.log("API response:", clinics);

    const validClinics = clinics.map((clinic: any) => clinicSchema.parse(clinic));

    return validClinics;
  } catch (error) {
    console.error("Error fetching clinics:", error);
    throw new Error("Failed to fetch clinics");
  }
};
