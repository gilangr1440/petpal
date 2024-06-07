import Layout from "@/components/layout";
import Loaders from "@/components/loaders";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axiosWithConfig from "@/utils/apis/axiosWithConfig";
import { useEffect, useState } from "react";

const ServiceRequests = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axiosWithConfig.get(
        `${import.meta.env.VITE_BASE_URL}/consultations`
      );
      setData(response.data.data);
    } catch (error: any) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <div className="relative container mx-auto min-h-[calc(100vh-68px-232px)] py-10 flex items-start justify-start flex-col gap-y-4">
        {loading ? (
          <Loaders className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
        ) : (
          <>
            <header className="mt-8">
              <h1 className="text-xl font-semibold">List Service Request</h1>
            </header>
            {data == null ? (
              <div className="w-full flex flex-col items-center justify-center">
                <img src="/public/assets/data-not-dound.png" alt="" />
                <h1 className="text-xl font-semibold">
                  You don't have Service Request
                </h1>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[60px]">No</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Service Nama</TableHead>
                    <TableHead>Transaction Status</TableHead>
                    <TableHead>Status Consultation</TableHead>
                    <TableHead>Tanggal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item, index) => (
                    <TableRow
                      key={item.ID}
                      onClick={() => console.log("Hello World!")}
                    >
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{item.UserDetails.full_name}</TableCell>
                      <TableCell>{item.Consultation}</TableCell>
                      <TableCell>{item.TransactionStatus}</TableCell>
                      <TableCell>{item.StatusConsultation}</TableCell>
                      <TableCell>
                        {new Date(item.CreatedAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default ServiceRequests;
