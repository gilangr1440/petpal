export interface ProductFormValues {
  product_name: string;
  price: number | string;
  stock: number | string;
  description: string;
  product_picture: File | null;
}

export interface ProductFormProps {
  defaultValues?: ProductFormValues;
  isEditing?: boolean;
}

export interface IProductListData {
  id: number;
  product_picture: string;
  product_name: string;
  price: number;
}

export interface IProductDetail {
  product_picture: string;
  product_name: string;
  price: number;
  description: string;
  stock: number;
}

export interface ProductAdmin {
  id: number;
  product_name: string;
  product_picture: string;
  price: number;
}
