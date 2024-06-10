export interface IConsultation {
    id: number;
    user_details: User;
    doctor_details: Doctor;
    service: string;
    transaction_status: string;
    consultation_status: string;
  }
  
  export interface User {
    id: number;
    full_name: string;
    profile_picture: string;
  }
  export interface Doctor {
    id: number;
    full_name: string;
    profile_picture: string;
  }