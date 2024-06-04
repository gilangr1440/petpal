import axios from "axios";
import { LoginType, RegisterType } from "./types";

interface registerPayload {
  data?: {
    Message: string;
    Number: number;
    SQLState: number[];
  };
  message: string;
}

interface loginPayload {
  data: {
    coordinate: string;
    full_name: string;
    id: number;
    token: string;
  };
  message: string;
}

interface loginAdminPayload {
  data: {
    token: string;
  };
  message: string;
}

export const userRegister = async (body: RegisterType) => {
  try {
    const response = await axios.post("http://zyannstore.my.id/users/register", body);
    return response.data as registerPayload;
  } catch (error: any) {
    return error.response.data;
  }
};

export const userLogin = async (body: LoginType) => {
  try {
    const response = await axios.post("http://zyannstore.my.id/users/login", body);
    return response.data as loginPayload;
  } catch (error: any) {
    return error.response.data;
  }
};

export const adminRegister = async (body: RegisterType) => {
  const adminBody = {
    fullname: body.full_name,
    email: body.email,
    password: body.password,
  };
  try {
    const response = await axios.post("http://zyannstore.my.id/admins/register", adminBody);
    return response.data as { message: string };
  } catch (error: any) {
    return error.response.data;
  }
};

export const adminLogin = async (body: LoginType) => {
  try {
    const response = await axios.post("http://zyannstore.my.id/admins/login", body);
    return response.data as loginAdminPayload;
  } catch (error: any) {
    return error.response.data;
  }
};
