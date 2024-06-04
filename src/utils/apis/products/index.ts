import { getProducts, addProduct, getProductsAdmin } from "./api";
import { productSchema } from "./scheme";
import {
  ProductFormValues,
  ProductFormProps,
  IProductListData,
  IProductDetail,
  ProductAdmin,
} from "./interfaces";

export { productSchema, getProducts, addProduct, getProductsAdmin };
export type {
  ProductFormValues,
  ProductFormProps,
  IProductListData,
  IProductDetail,
  ProductAdmin,
};
