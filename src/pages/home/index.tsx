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

const Home = () => {
  const [data, setData] = useState<IProductListData[]>([]);
  const [sort] = useAtom(sortProductsAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProducts(`${sort && `sort=${sort}`}`);
        setData(products.data);
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
      <section className="container mx-auto h-full flex items-start justify-center flex-col gap-y-8 py-6">
        <header className="w-full flex flex-col items-start sm:items-end justify-between gap-y-4 sm:flex-row">
          <CategoryTabs />
          <SortProducts />
        </header>
        <ProductList data={data} />
      </section>
    </Layout>
  );
};

export default Home;
