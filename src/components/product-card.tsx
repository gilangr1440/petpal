import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { IProductListData } from "@/utils/apis/products";
import { useCookies } from "react-cookie";

interface IProductCart {
  data: IProductListData;
}

const ProductCard = ({ data }: IProductCart) => {
  const [cookies, setCookie, removeCookie] = useCookies<any>(["token", "role"]);

  return (
    <Link to={`${cookies.role == "user" ? `/products/${data.id}` : `/admin/products/${data.id}`}`} key={data.id}>
      <Card>
        <CardHeader>
          <img src={data.product_picture} alt="" className="rounded-sm h-[300px] object-cover" />
        </CardHeader>
        <CardContent>
          <h1 className="text-base font-semibold">{data.product_name}</h1>
        </CardContent>
        <CardFooter>
          <h3>Rp. {data.price}</h3>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
