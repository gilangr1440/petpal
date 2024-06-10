import { z } from "zod";
import { addConsultationSchema, clinicSchema, openHoursSchema } from "@/utils/apis/list-clinics/schema";

export type Clinic = z.infer<typeof clinicSchema>;
export type OpenHours = z.infer<typeof openHoursSchema>;
export type ConsultationType = z.infer<typeof addConsultationSchema>;

export type ClinicType = {
  admin_id: number;
  clinic_name: string;
  open: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
  };
  service: {
    vaccinations: boolean;
    operations: boolean;
    mcu: boolean;
    online_consultations: boolean;
  };
  id_veterinary: number;
  veterinary: string;
  veterinary_picture: string;
  location: string;
  coordinate: string;
  distance: number;
  clinic_picture: string;
  price: number;
  about: string;
};

export type ConsultationHistoryType = {
  id: number;
  consultation_status: string;
  scheduled_date: string;
  service: string;
  transaction_status: string;
  doctor_details: {
    full_name: string;
    id: number;
    profile_picture: string;
  };
  user_details: {
    full_name: string;
    id: number;
    profile_picture: string;
  };
};
