import ClinicCard from "@/components/clinic-card";
import Loaders from "@/components/loaders";
import axiosWithConfig from "@/utils/apis/axiosWithConfig";
import { useEffect, useState } from "react";

const HomeClinicList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosWithConfig("/clinics");
      setData(response.data.data);
    } catch (error: any) {
      console.log(error);
      throw new error();
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="relative min-h-[400px] w-full flex items-center justify-center">
        <Loaders className="" />
      </main>
    );
  }
  if (data === null) {
    return <p>Clinic Not Found</p>;
  }

  return (
    <main className="w-full bg-red-500 grid grid-cols-1 lg:grid-cols-2 gap-4">
      {data.map((item) => (
        <ClinicCard
          key={item.admin_id}
          image="https://source.unsplash.com/random?hospital"
          title={item?.item_name}
          description={`
                Service: ${item.service}, 
                Veterinary: ${item.veterinary}, 
                Location: ${item.location}, 
                Distance: ${item.distance.toFixed(2)} km`}
        />
      ))}
    </main>
  );
};

export default HomeClinicList;
