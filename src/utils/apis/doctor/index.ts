import { doctorSchema } from "./scheme";
import { DoctorFormValues, DoctorFormattedData, AvailableDays, Services } from "./interface";
import { addDoctor, getDoctor } from "./api";

export type { DoctorFormValues, DoctorFormattedData, AvailableDays, Services };
export { doctorSchema, addDoctor, getDoctor };
