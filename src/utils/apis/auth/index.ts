import { registerSchema, loginSchema, RegisterType, LoginType } from "./types";
import { userRegister, userLogin, adminRegister, adminLogin } from "./api";

export { userRegister, userLogin, adminRegister, adminLogin };
export type { RegisterType, LoginType };
export { registerSchema, loginSchema };
