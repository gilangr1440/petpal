import { z } from "zod";
import { clinicSchema, openHoursSchema } from "@/utils/apis/list-clinics/schema";

export type Clinic = z.infer<typeof clinicSchema>;
export type OpenHours = z.infer<typeof openHoursSchema>;