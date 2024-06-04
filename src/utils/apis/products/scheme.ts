import * as z from "zod";

const MAX_MB = 2;
const MAX_UPLOAD_SIZE = 1024 * 1024 * MAX_MB;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const productSchema = z.object({
  product_name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  price: z.string().refine((value) => !isNaN(parseFloat(value)) && parseFloat(value) >= 0.01, {
    message: "Price must be a number and at least 0.01.",
  }),
  stock: z.string().refine((value) => !isNaN(parseInt(value)) && parseInt(value) >= 1, {
    message: "Stock must be a number and at least 1.",
  }),
  description: z.string().min(3, {
    message: "Description must be at least 3 characters.",
  }),
  product_picture: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= MAX_UPLOAD_SIZE, `Max image size is ${MAX_MB}MB`)
    .refine((file) => !file || file.type === "" || ACCEPTED_IMAGE_TYPES.includes(file.type), "Only .jpg, .jpeg, and .png formats are supported"),
});
