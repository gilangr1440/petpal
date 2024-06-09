import { useEffect, useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Layout from "@/components/layout";
import NumberFormatter from "@/components/number-formatter";

import { IProductDetail, OrderProducts, addOrder } from "@/utils/apis/products";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loaders from "@/components/loaders";

const DetailProduct: React.FC = () => {
  let { id } = useParams<{ id: string }>();
  const [detailProduct, setDetailProduct] = useState<IProductDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const detailProduct = await axios.get(`${import.meta.env.VITE_BASE_URL}/products/${Number(id)}`);
      setDetailProduct(detailProduct.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch product details:", error);
      throw new Error(`${error}`);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const orderProduct = async (body: OrderProducts) => {
    try {
      const result = await addOrder(body);
      navigate(`/payment/${result.data.id}`);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const handleIncrement = () => {
    if (detailProduct && quantity >= detailProduct.stock) return;
    setQuantity((quantity) => quantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((quantity) => Math.max(quantity - 1, 1));
  };

  return (
    <Layout>
      <Card className="max-w-4xl mx-auto p-4 flex flex-col md:flex-row items-center mt-20">
        {loading ? (
          <Loaders className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
        ) : (
          <>
            <img src={`${detailProduct?.product_picture}`} alt={`${detailProduct?.product_name}`} className="w-full md:w-80 h-auto object-cover rounded-lg mb-auto" />
            <CardContent className="w-full md:w-1/2 md:ml-8 flex items-start justify-start flex-col">
              <CardTitle className="text-2xl font-bold mb-2 ">{`${detailProduct?.product_name}`}</CardTitle>
              <span className="text-xl font-semibold text-gray-700 mb-4">
                <NumberFormatter value={`${detailProduct?.price}`} />
              </span>
              <span className="text-gray-600 mb-4 mr-2">{`${detailProduct?.description}`}</span>
              <div className="flex items-center mb-4">
                <span className="mr-2">Stock:</span>
                <span className="font-bold">{`${detailProduct?.stock}`}</span>
              </div>
              <div className="flex items-center mb-4 space-x-2">
                <Button variant="outline" onClick={handleDecrement}>
                  -
                </Button>
                <Input type="number" className="text-center w-14 border-t border-b border-gray-300 focus:outline-none" value={quantity} readOnly />
                <Button variant="outline" onClick={handleIncrement}>
                  +
                </Button>
              </div>
              <Button onClick={() => orderProduct({ product_id: Number(id), quantity: quantity })} className={buttonVariants({ variant: "default" })}>
                Pay Now
              </Button>
            </CardContent>
          </>
        )}
      </Card>
    </Layout>
  );
};

export default DetailProduct;
