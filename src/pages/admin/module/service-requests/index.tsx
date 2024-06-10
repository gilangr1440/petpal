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
import { getConsultations } from "@/utils/apis/clinics/api";
import { useEffect, useState } from "react";

const ServiceRequests = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getConsultations().then((response) => {
      setLoading(true);
      setData(response.data);
      setLoading(false);
    });
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
                    <TableHead>Nama</TableHead>
                    <TableHead>Service Nama</TableHead>
                    <TableHead>Transaction Status</TableHead>
                    <TableHead>Status Consultation</TableHead>
                    <TableHead>Tanggal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item) => (
                    <TableRow
                      key={item.id}
                      onClick={() => console.log("Hello World!")}
                    >
                      <TableCell className="capitalize">
                        {item.user_details.full_name}
                      </TableCell>
                      <TableCell className="capitalize">
                        {item.service}
                      </TableCell>
                      <TableCell className="capitalize">
                        {item.transaction_status}
                      </TableCell>
                      <TableCell className="capitalize">
                        {item.consultation_status}
                      </TableCell>
                      <TableCell className="capitalize">
                        {item.scheduled_date}
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
