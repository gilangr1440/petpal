//? Components
import Layout from "@/components/layout";
import Hero from "./Hero";
import CategoryTabs from "./category-tabs";

//? Utils
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { sortProductsAtom } from "@/utils/jotai/atom";
import { IProductListData, getProducts } from "@/utils/apis/products";
import ProductList from "@/components/product-list";
import SortProducts from "@/components/sort-product";
import Loaders from "@/components/loaders";

const Home = () => {
  const [data, setData] = useState<IProductListData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sort] = useAtom(sortProductsAtom);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const products = await getProducts(`${sort && `sort=${sort}`}`);
        setData(products.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, [sort]);

  return (
    <Layout>
      <section className="w-full h-auto bg-gradient-to-r from-[#036DA1] via-[#3487AC] to-[#C6D6CE]">
        <div className="container mx-auto h-full grid grid-cols-1 lg:grid-cols-2 place-items-center pt-8">
          <Hero />
        </div>
      </section>
      <section className="relative container mx-auto h-full flex items-start justify-center flex-col gap-y-8 py-6">
        {loading ? (
          <Loaders className="absolute top-full left-1/2 -translate-y-1/2 -translate-x-1/2" />
        ) : (
          <>
            <header
              className={`w-full flex flex-col ${
                loading
                  ? "items-center justify-center"
                  : "items-start justify-between"
              } sm:items-end  gap-y-4 sm:flex-row`}
            >
              <CategoryTabs />
              <SortProducts />
            </header>
            <ProductList data={data} />
          </>
        )}
      </section>
    </Layout>
  );
};

export default Home;
