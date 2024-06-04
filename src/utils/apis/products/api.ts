import axiosWithConfig from "../axiosWithConfig";

export const getProducts = async (params?: string) => {
  try {
    const response = await axiosWithConfig.get(
      `http://zyannstore.my.id/products?${params}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductDetail = async (id: number) => {
  try {
    const response = await axiosWithConfig.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};
