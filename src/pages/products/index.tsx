import Layout from "@/components/layout";
import ProductList from "@/components/product-list";
import SortProducts from "@/components/sort-product";
import {
  Button,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { IProductListData, getProducts } from "@/utils/apis/products";
import { sortProductsAtom } from "@/utils/jotai/atom";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

const AllProducts = () => {
  const [data, setData] = useState<IProductListData[]>([]);
  const [sort] = useAtom(sortProductsAtom);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProducts(
          `${page && `page=${page}`}${sort && `&sort=${sort}`}`
        );
        setData(products.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, [sort, page]);

  const nextPage = () => {
    setPage((prevState) => prevState + 1);
    console.log(page + 1);
  };

  const prevPage = () => {
    if (page === 1) return;
    setPage((prevState) => prevState - 1);
    console.log(page - 1);
  };

  return (
    <Layout>
      <div className="container mx-auto h-full py-8 flex items-end justify-center flex-col gap-y-8">
        <SortProducts />
        {data && data.length > 0 ? (
          <ProductList data={data} />
        ) : (
          <div className="w-full flex flex-col items-center justify-center">
            <img src="/public/assets/data-not-dound.png" alt="" />
            <Button onClick={prevPage}>Back</Button>
          </div>
        )}
        {data && data.length >= 10 ? (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={prevPage} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext onClick={nextPage} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        ) : null}
      </div>
    </Layout>
  );
};

export default AllProducts;
