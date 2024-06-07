export interface DoctorFormValues {
  full_name: string;
  about: string;
  price: number | string;
  available_days: string[];
  services: string[];
  profile_picture: File | null;
}

export interface DoctorFormattedData {
  id: number | null;
  full_name: string;
  about: string;
  price: number | string;
  available_days: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
  };
  services: {
    vaccinations: boolean;
    operations: boolean;
    mcu: boolean;
  };
  profile_picture: File | null;
}

export interface AvailableDays {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
}

export interface Services {
  vaccinations: boolean;
  operations: boolean;
  mcu: boolean;
}
