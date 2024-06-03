import { IProductListData } from "../../utils/apis/products";
import ProductCard from "@/components/product-card";

interface ProductListProps {
  data: IProductListData[];
}

const ProductList = ({ data }: ProductListProps) => {
  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {data.map((item) => (
        <ProductCard data={item} />
      ))}
    </main>
  );
};

export default ProductList;
