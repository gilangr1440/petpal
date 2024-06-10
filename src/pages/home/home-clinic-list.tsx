import Loaders from "@/components/loaders";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getClinics } from "@/utils/apis/list-clinics/api";
import { getKeyByValue } from "@/utils/apis/list-clinics/helper";
import { ClinicType } from "@/utils/apis/list-clinics/types";
import { useAuth } from "@/utils/contexts/auth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomeClinicList = () => {
  const [clinics, setClinics] = useState<ClinicType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = useAuth();

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        setLoading(true);
        const data = await getClinics();
        console.log("Fetched clinics:", data);
        setClinics(data.data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching clinics:", error);
      }
    };
    fetchClinics();
  }, [token]);
  if (clinics === null) {
    return <p>Clinic Not Found</p>;
  }

  if (loading) {
    return (
      <main className="relative min-h-[400px] w-full flex items-center justify-center">
        <Loaders className="" />
      </main>
    );
  }

  if (clinics === null) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <img src="/public/assets/data-not-dound.png" alt="" />
      </div>
    );
  }

  return (
    <main className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
      {clinics.map((clinic) => (
        <Link
          to={`${!token ? `login` : `/detail-doctor/${clinic.admin_id}`}`}
          key={clinic.admin_id}
        >
          <Card className="flex gap-3 p-3 items-center">
            <div className="w-full max-w-[400px] h-36">
              <img
                src={clinic.clinic_picture}
                alt="clinic"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <CardHeader>
              <CardTitle>{clinic.clinic_name}</CardTitle>
              <CardDescription>{`
                    Service: ${getKeyByValue(clinic?.service)}, 
                    Veterinary: ${clinic.veterinary}, 
                    Location: ${clinic?.location}, 
                    Distance: ${clinic?.distance?.toFixed(
                      2
                    )} km`}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </main>
  );
};

export default HomeClinicList;
