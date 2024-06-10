import Layout from "@/components/layout";
import Loaders from "@/components/loaders";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { orderHistory } from "@/utils/apis/products/api";
import { useEffect, useState } from "react";

const History = () => {
  const [orderItem, setOrderItem] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    orderHistory().then((response) => {
      setOrderItem(response.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Loaders className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
    );
  }
  return (
    <Layout>
      <div className="w-4/5 mx-auto my-10">
        <h1 className="text-2xl font-semibold">Payment History</h1>
        <div className="my-5">
          {orderItem && orderItem != null ? (
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Virtual Code</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderItem.map((item) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell>{item.product_name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.payment.payment_status}</TableCell>
                      <TableCell>{item.payment.va_number}</TableCell>
                      <TableCell>{item.price}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="w-full h-full flex items-center justify-center flex-col">
              <img
                src="/assets/data-not-dound.png"
                alt=""
                className="mx-auto"
              />
              <h1>You dont have Order History</h1>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default History;
