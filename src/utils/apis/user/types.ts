import { z } from "zod";
const MAX_MB = 2;
const MAX_UPLOAD_SIZE = 1024 * 1024 * MAX_MB;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const editUserSchema = z.object({
  full_name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z.string().min(6, { message: "Password must be at least 6" }).optional(),
  alamat: z.string().min(1, { message: "Address is required" }),
  koordinat: z.string().min(1, { message: "Koordinat is required" }),
  number_phone: z.string().min(8, { message: "Phone must be at least 8" }),
  profile_picture: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_UPLOAD_SIZE, `Max image size is ${MAX_MB}MB`)
    .refine((file) => file.type === "" || ACCEPTED_IMAGE_TYPES.includes(file.type), "Only .jpg, .jpeg, and .png formats are supported"),
});

export type UserType = {
  id?: number;
  full_name?: string;
  email?: string;
  profile_picture?: string;
  koordinate?: string;
  address?: string;
  number_phone?: string;
};

export interface UserFormValues {
  full_name: string;
  email: string;
  password: string | undefined;
  alamat: string;
  koordinat: string;
  number_phone: string;
  profile_picture: File | null;
}
