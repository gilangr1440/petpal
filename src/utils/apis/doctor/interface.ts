export interface DoctorFormValues {
  full_name: string;
  about: string;
  price: number | string;
  available_days: string[];
  services: string[];
  doctor_picture: File | null;
}
