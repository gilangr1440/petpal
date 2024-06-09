import axiosWithConfig from "@/utils/apis/axiosWithConfig";

const API_BASE_URL = "https://zyannstore.my.id/clinics";

export const getClinics = async () => {
  try {

    const response = await axiosWithConfig.get(`${API_BASE_URL}`);
    const clinics = response.data;
    console.log("API response:", clinics)

    return response.data;
  } catch (error) {
    console.error("Error fetching clinics:", error);
    throw new Error("Failed to fetch clinics");
  }
};
