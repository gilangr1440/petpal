import ClinicCard from "@/components/clinic-card";
import { getClinics } from "@/utils/apis/list-clinics/api";
import { Clinic } from "@/utils/apis/list-clinics/types";
import { useAuth } from "@/utils/contexts/auth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomeClinicList = () => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const data = await getClinics();
        console.log("Fetched clinics:", data);
        setClinics(data.data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching clinics:", error);
      }
    };
    fetchClinics();
  }, [token]);
  if (clinics === null) {
    return <p>Clinic Not Found</p>;
  }

  return (
    <main className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
      {clinics.map((clinic) => (
        <Link to={"/detail-doctor/:id"} key={clinic.admin_id}>
          <ClinicCard
            image={clinic.clinic_picture}
            title={clinic.clinic_name}
            description={`
              Service: ${clinic.service}, 
              Veterinary: ${clinic.veterinary}, 
              Location: ${clinic.location}, 
              Distance: ${clinic?.distance?.toFixed(2)} km`}
          />
        </Link>
      ))}
    </main>
  );
};

export default HomeClinicList;
