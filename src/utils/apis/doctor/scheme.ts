import * as z from "zod";

const MAX_MB = 2;
const MAX_UPLOAD_SIZE = 1024 * 1024 * MAX_MB;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const doctorSchema = z.object({
  full_name: z.string().min(1, {
    message: "Full name is required",
  }),
  about: z.string().min(1, {
    message: "About is required",
  }),
  price: z.string().refine((value) => !isNaN(parseFloat(value)) && parseFloat(value) >= 0.01, {
    message: "Price must be a number and at least 0.01.",
  }),
  available_days: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  services: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  profile_picture: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= MAX_UPLOAD_SIZE, `Max image size is ${MAX_MB}MB`)
    .refine((file) => !file || file.type === "" || ACCEPTED_IMAGE_TYPES.includes(file.type), "Only .jpg, .jpeg, and .png formats are supported"),
});
