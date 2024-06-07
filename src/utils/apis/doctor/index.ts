import { doctorSchema } from "./scheme";
import { DoctorFormValues, DoctorFormattedData, AvailableDays, Services } from "./interface";
import { addDoctor, getDoctor, editDoctor } from "./api";
import { checkProperty } from "./helper";

export type { DoctorFormValues, DoctorFormattedData, AvailableDays, Services };
export { doctorSchema, addDoctor, getDoctor, editDoctor };
export { checkProperty };
