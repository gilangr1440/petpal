import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
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
  const [doctorProfile, setDoctorProfile] = useState<any>(null);

  const getData = async () => {
    try {
      const response = await axiosWithConfig.get(
        "http://zyannstore.my.id/consultations"
      );
      setData(response.data.data);
      setDoctorProfile(response.data.data[0]);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(data);

  return (
    <Layout>
      <div className="container mx-auto h-full py-20 flex items-start justify-start flex-col gap-y-4">
        {doctorProfile && (
          <figure className="flex items-center justify-center flex-col gap-x-4 mx-auto lg:items-start lg:justify-start lg:flex-row lg:mx-0">
            <div>
              <img
                src={doctorProfile.doctor_profile_picture}
                alt={doctorProfile.doctor_fullname}
                className="w-[100px] h-[100px] ring-2 rounded-full"
              />
            </div>
            <div className="flex items-center justify-center flex-col lg:items-start lg:justify-start">
              <h1 className="text-lg font-semibold">
                {doctorProfile.doctor_fullname}
              </h1>
              <p>Bogor, Available on weekdays</p>
              <Button className="mt-1">Edit Profile</Button>
            </div>
          </figure>
        )}
        <header className="mt-8">
          <h1 className="text-xl font-semibold">List Service Request</h1>
        </header>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">No</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Service Nama</TableHead>
              <TableHead>Jenis</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Persetujuan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{item.user_fullname}</TableCell>
                <TableCell>{item.consultation}</TableCell>
                <TableCell>{item.transaction_status}</TableCell>
                <TableCell>
                  {new Date(item.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>{item.status_consultation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
};

export default ServiceRequests;
