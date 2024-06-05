import axiosWithConfig from "../axiosWithConfig";

export const getConsultations = async () => {
  try {
    const response = await axiosWithConfig.get(
      `${import.meta.env.VITE_BASE_URL}/consultations`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    return [];
  }
};
