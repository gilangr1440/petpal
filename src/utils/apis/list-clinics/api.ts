import axios from "axios";
import { Clinic } from "@/utils/apis/list-clinics/types";
import { clinicSchema } from "@/utils/apis/list-clinics/schema";

const API_BASE_URL = "https://zyannstore.my.id/clinics";

export const getClinics = async (): Promise<Clinic[]> => {
  try {
    const response = await axios.get(API_BASE_URL);
    const clinics = response.data;
    console.log("API response:", clinics);
    const validClinics = clinics.map((clinic: any) => clinicSchema.parse(clinic));

    return validClinics;
  } catch (error) {
    console.error("Error fetching clinics:", error);
    throw new Error("Failed to fetch clinics");
  }
};
