import axiosWithConfig from "../axiosWithConfig";
import { OrderProducts, ProductFormValues } from "./interfaces";

export const getProducts = async (params?: string) => {
  try {
    const response = await axiosWithConfig.get(`/products${params}`);
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

    const response = await axiosWithConfig.post("https://zyannstore.my.id/products", formData);
    return response.data;
  } catch (error: any) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const getProductsAdmin = async (limit: number) => {
  try {
    const response = await axiosWithConfig.get(`/products?page=1&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const editProduct = async (body: ProductFormValues, id: number) => {
  try {
    const formData = new FormData();

    formData.append("product_name", body.product_name);
    formData.append("price", body.price.toString());
    formData.append("stock", body.stock.toString());
    formData.append("description", body.description);

    if (body.product_picture) {
      formData.append("product_picture", body.product_picture);
    }

    const response = await axiosWithConfig.patch(`https://zyannstore.my.id/products/${id}`, formData);
    return response.data;
  } catch (error: any) {
    console.error("Error edit product:", error);
    throw error;
  }
};

export const addOrder = async (body: OrderProducts) => {
  try {
    const response = await axiosWithConfig.post(`https://zyannstore.my.id/orders`, body);
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getOrder = async (id?: string) => {
  try {
    const response = await axiosWithConfig.get(`https://zyannstore.my.id/orders/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const orderHistory = async () => {
  try {
    const response = await axiosWithConfig.get("/orders");
    return response.data;
  } catch (error: any) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
