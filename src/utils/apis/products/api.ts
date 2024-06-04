import axiosWithConfig from "../axiosWithConfig";
import { ProductFormValues } from "./interfaces";

export const getProducts = async (params?: string) => {
  try {
    const response = await axiosWithConfig.get(`/products?${params}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const addProduct = async (body: ProductFormValues) => {
  try {
    const formData = new FormData();

    formData.append("product_name", body.product_name);
    formData.append("price", body.price.toString());
    formData.append("stock", body.stock.toString());
    formData.append("description", body.description);

    if (body.product_picture) {
      formData.append("product_picture", body.product_picture);
    }

    const response = await axiosWithConfig.post(
      "https://zyannstore.my.id/products",
      formData
    );
    return response.data;
  } catch (error: any) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const getProductsAdmin = async () => {
  try {
    const response = await axiosWithConfig.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
