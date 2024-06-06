import ClinicCard from "@/components/clinic-card";
import Layout from "@/components/layout";
import { useEffect, useState } from "react";
import { getClinics } from "@/utils/apis/list-clinics/api";
import { Clinic } from "@/utils/apis/list-clinics/types";

const ClinicLists = () => {
  const [clinics, setClinics] = useState<Clinic[]>([]);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const data = await getClinics();
        console.log("Fetched clinics:", data);
        setClinics(data);
      } catch (error) {
        console.error("Error fetching clinics:", error);
      }
    };
    fetchClinics();
  }, []);

  return (
    <Layout>
      <div className="w-4/5 mx-auto my-8">
        <h1 className="text-2xl font-bold my-5">Clinic Lists</h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
          {clinics.map((clinic) => (
            <ClinicCard
              key={clinic.admin_id}
              image="https://source.unsplash.com/random?hospital"
              title={clinic?.clinic_name}
              description={`
                Service: ${clinic.service}, 
                Veterinary: ${clinic.veterinary}, 
                Location: ${clinic.location}, 
                Distance: ${clinic.distance.toFixed(2)} km`}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ClinicLists;
