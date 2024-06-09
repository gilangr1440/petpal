import Layout from "@/components/layout";
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
  useEffect(() => {
    orderHistory().then((response) => {
      setOrderItem(response.data);
    });
  }, []);

  return (
    <Layout>
      <div className="w-4/5 mx-auto my-10">
        <h1 className="text-2xl font-semibold">Payment History</h1>
        <div className="my-5">
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
              {orderItem &&
                orderItem.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.product_name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.payment.payment_status}</TableCell>
                    <TableCell>{item.payment.va_number}</TableCell>
                    <TableCell>{item.price}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default History;
