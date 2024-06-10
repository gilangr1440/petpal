import { z } from "zod";

export const openHoursSchema = z.object({
  id: z.number(),
  doctor_id: z.number(),
  monday: z.boolean(),
  tuesday: z.boolean(),
  wednesday: z.boolean(),
  thursday: z.boolean(),
  friday: z.boolean(),
});

export const clinicSchema = z.object({
  admin_id: z.number(),
  clinic_name: z.string(),
  open: openHoursSchema,
  service: z.string(),
  veterinary: z.string(),
  location: z.string(),
  coordinate: z.string(),
  distance: z.number(),
});

export const addConsultationSchema = z.object({
  scheduled_date: z.date({
    required_error: "A date of consul is required.",
  }),
  service: z.string({
    required_error: "Please select a service.",
  }),
});
