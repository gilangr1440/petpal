import Layout from "@/components/layout";
import Hero from "./Hero";
import CategoryTabs from "./category-tabs";
import { useState } from "react";
import SortProducts from "@/components/sort-product";
import HomeProductList from "./home-product-list";
import HomeClinicList from "./home-clinic-list";
import { useCookies } from "react-cookie";

const Home = () => {
  const [activeTab, setActiveTab] = useState("petshop");
  const [cookies, setCookie, removeCookie] = useCookies<any>(["token", "role"]);

  return (
    <Layout>
      <section className="w-full h-auto bg-gradient-to-r from-[#036DA1] via-[#3487AC] to-[#C6D6CE]">
        <div className="container mx-auto h-full grid grid-cols-1 lg:grid-cols-2 place-items-center pt-8">
          <Hero />
        </div>
      </section>
      <section className="relative container mx-auto h-full flex items-start justify-center flex-col gap-y-8 py-6">
        {cookies.role == "user" || !cookies.role ? (
          <>
            <header
              className={`w-full flex flex-col sm:items-end gap-y-4 sm:flex-row sm:justify-between`}
            >
              <CategoryTabs onTabChange={setActiveTab} />
              {activeTab === "petshop" ? <SortProducts /> : null}
            </header>
            {activeTab === "petshop" ? <HomeProductList /> : <HomeClinicList />}
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold">My Products</h1>
            <HomeProductList />
          </>
        )}
      </section>
    </Layout>
  );
};

export default Home;
