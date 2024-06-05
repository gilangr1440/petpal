import Layout from "@/components/layout";
import ProductsAdminCard from "@/components/products-admin-card";
import { ProductAdmin, getProductsAdmin } from "@/utils/apis/products";
import { useAuth } from "@/utils/contexts/auth";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Admin = () => {
  const [products, setProducts] = useState<ProductAdmin[]>([]);
  const navigate = useNavigate();
  const { token } = useAuth();

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

  const handleEdit = (id: number) => {
    navigate(`/admin/products/add-edit?action=edit&id=${id}`);
  };

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://zyannstore.my.id/products/${id}`, { headers: { Authorization: `Bearer ${token}` } })
          .then((res) => {
            console.log(res);
            Swal.fire({
              title: "Deleted!",
              text: "Your product has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => console.log(err));
      }
    });
  };

  useEffect(() => {
    fetchProductsAdmin();
  }, [products.length]);

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
          {products &&
            products.map((data: ProductAdmin, index: number) => (
              <ProductsAdminCard key={index} title={data.product_name} cost={data.price} img={data.product_picture} onClick={() => handleDetail(data.id)} onEdit={() => handleEdit(data.id)} onDelete={() => handleDelete(data.id)} />
            ))}
        </main>
      </div>
    </Layout>
  );
};

export default Admin;
