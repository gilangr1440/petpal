import Layout from "@/components/layout";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IProductDetail, getProductDetail } from "@/utils/apis/products";
import { useAuth } from "@/utils/contexts/auth";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const DetailProductByAdmin = () => {
  const { product_id } = useParams();
  const [detailProduct, setDetailProduct] = useState<Partial<IProductDetail>>({});
  const navigate = useNavigate();
  const { token } = useAuth();

  const getDetailData = async (id: string | undefined) => {
    try {
      const result = await getProductDetail(Number(id));
      setDetailProduct(result.data);
    } catch (error) {
      return error;
    }
  };

  const handleEdit = (id: string | undefined) => {
    navigate(`/admin/products/add-edit?action=edit&id=${id}`);
  };

  const handleDelete = async (id: string | undefined) => {
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
            setTimeout(() => {
              navigate("/admin");
            }, 2000);
          })
          .catch((err) => console.log(err));
      }
    });
  };

  useEffect(() => {
    getDetailData(product_id);
  });

  return (
    <Layout>
      <div className="container mx-auto h-full pt-20 px-2">
        <Card className="max-w-[900px] grid sm:grid-cols-2 grid-cols-1 py-2 px-1 mx-auto">
          <figure className="max-w-[540px] h-full flex items-start justify-center mx-auto">
            <img src={detailProduct?.product_picture} alt="" className="w-[80%]" />
          </figure>
          <div className="w-full h-full flex items-start justify-center flex-col">
            <div className="w-full flex items-start justify-center flex-col gap-y-2">
              <h1 className="text-xl font-semibold sm:text-2xl lg:text-3xl">{detailProduct?.product_name}</h1>
              <h3 className="text-base font-medium sm:text-lg lg:text-xl">Rp {detailProduct?.price}</h3>
              <p className="text-base font-normal lg:text-lg">{detailProduct?.description}</p>
              <p className="text-base font-medium lg:text-lg">Stock: {detailProduct?.stock}</p>
            </div>
            <div className="flex items-center justify-start gap-x-4 mt-6 sm:mt-auto">
              <Button variant={"destructive"} onClick={() => handleDelete(product_id)}>
                Delete
              </Button>
              <Button
                className={`${buttonVariants({
                  variant: "default",
                })} bg-[#036DA1] hover:bg-[#036DA1] hover:bg-opacity-90`}
                onClick={() => handleEdit(product_id)}
              >
                Edit
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default DetailProductByAdmin;
