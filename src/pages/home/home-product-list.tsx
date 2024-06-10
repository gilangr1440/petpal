import { useEffect, useState } from "react";
import { IProductListData, getProducts } from "../../utils/apis/products";
import ProductCard from "@/components/product-card";
import { useAtom } from "jotai";
import { limitProducts, searchProducts, sortProductsAtom } from "@/utils/jotai/atom";
import Loaders from "@/components/loaders";
import { Button } from "@/components/ui/button";

const HomeProductList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IProductListData[]>([]);
  const [sort] = useAtom(sortProductsAtom);
  const [limit, setLimit] = useAtom(limitProducts);
  const [searchParams] = useAtom(searchProducts);
  console.log(searchParams);

  const fetchData = async () => {
    setLoading(true);
    try {
      const products = await getProducts(`${searchParams && "/search"}?&limit=${limit}&name=${searchParams}&sort=${sort}`);
      setData(products.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [sort, limit, searchParams]);

  const handleLimit = () => {
    setLimit(limit + 10);
  };

  // ! Handle Loading
  if (loading) {
    return (
      <main className="relative min-h-[400px] w-full flex items-center justify-center">
        <Loaders className="" />
      </main>
    );
  }

  // ! Handle if empty data
  if (data === null) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <img src="/public/assets/data-not-dound.png" alt="" />
      </div>
    );
  }

  return (
    <>
      <main className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data.map((item) => (
          <ProductCard data={item} key={item.id} />
        ))}
      </main>
      <Button onClick={handleLimit}>Load More</Button>
    </>
  );
};

export default HomeProductList;
