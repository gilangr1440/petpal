import ClinicCard from "@/components/clinic-card";
import Layout from "@/components/layout";
import { useEffect, useState } from "react";
import { getClinics } from "@/utils/apis/list-clinics/api";
import { ClinicType } from "@/utils/apis/list-clinics/types";
import { useAuth } from "@/utils/contexts/auth";
import { Link } from "react-router-dom";
import { getKeyByValue } from "@/utils/apis/list-clinics/helper";

const ClinicLists = () => {
  const [clinics, setClinics] = useState<ClinicType[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const data = await getClinics();
        setClinics(data.data);
      } catch (error) {
        console.error("Error fetching clinics:", error);
      }
    };
    fetchClinics();
  }, [token]);

  return (
    <Layout>
      <div className="w-4/5 mx-auto my-8">
        <h1 className="text-2xl font-bold my-5">Clinic Lists</h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
          {clinics &&
            clinics.map((clinic) => (
              <Link to={`/detail-doctor/${clinic.admin_id}`} key={clinic.admin_id}>
                <ClinicCard
                  image={clinic?.clinic_picture}
                  title={clinic?.clinic_name}
                  description={`
                    Service: ${getKeyByValue(clinic?.service)}, 
                    Veterinary: ${clinic.veterinary}, 
                    Location: ${clinic?.location}, 
                    Distance: ${clinic?.distance?.toFixed(2)} km`}
                />
              </Link>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default ClinicLists;
