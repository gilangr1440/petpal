import Layout from "@/components/layout";
import ProductsAdminCard from "@/components/products-admin-card";
import { ProductAdmin, getProductsAdmin } from "@/utils/apis/products";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Admin = () => {
  const [products, setProducts] = useState<ProductAdmin[]>([]);
  const navigate = useNavigate();

  const fetchProductsAdmin = async () => {
    try {
      const result = await getProductsAdmin();
      setProducts(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDetail = (id: number) => {
    navigate(`/products/${id}`);
  };

  useEffect(() => {
    fetchProductsAdmin();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto h-full">
        <header className="w-full flex items-center justify-between py-4">
          <h1 className="text-2xl font-medium">List Product</h1>
          <Link to={"/admin/products/add-edit?action=add"} className="text-white px-4 py-2 rounded-md text-center font-medium bg-[#036DA1] hover:bg-[#036DA1] hover:bg-opacity-90">
            Add Products
          </Link>
        </header>
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-4 place-items-center">
          {products && products.map((data: ProductAdmin, index: number) => <ProductsAdminCard key={index} title={data.product_name} cost={data.price} img={data.product_picture} onClick={() => handleDetail(data.id)} />)}
        </main>
      </div>
    </Layout>
  );
};

export default Admin;
