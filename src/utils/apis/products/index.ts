import { getProductDetail, getProducts, addProduct, getProductsAdmin, editProduct } from "./api";
import { productSchema } from "./scheme";
import { ProductFormValues, ProductFormProps, IProductListData, IProductDetail, ProductAdmin } from "./interfaces";

export { productSchema, getProducts, getProductDetail, addProduct, getProductsAdmin, editProduct };
export type { ProductFormValues, ProductFormProps, IProductListData, IProductDetail, ProductAdmin };
