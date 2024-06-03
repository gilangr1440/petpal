import { UserType } from "../apis/user";
import { ReactNode, useContext, useEffect, useState, createContext } from "react";
import axiosWithConfig, { setAxiosConfig } from "../apis/axiosWithConfig";
import { getUser } from "../apis/user";
import { useCookies } from "react-cookie";
import { AdminType, getAdmin } from "../apis/admin";

interface Context {
  token: string;
  user: Partial<UserType>;
  admin: Partial<AdminType>;
  changeToken: (token?: string) => void;
}

const InitialState = {
  token: "",
  user: {},
  admin: {},
  changeToken: () => {},
};

const AuthContext = createContext<Context>(InitialState);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [cookies, setCookie, removeCookie] = useCookies<any>(["token", "role"]);
  const [token, setToken] = useState(cookies.token ?? "");
  const [user, setUser] = useState<Partial<UserType>>({});
  const [admin, setAdmin] = useState<Partial<AdminType>>({});
  console.log(user);
  console.log(admin);

  useEffect(() => {
    setAxiosConfig(token);
    token !== "" && cookies.role == "user" && fetchUser();
    token !== "" && cookies.role == "admin" && fetchAdmin();
    axiosWithConfig.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          changeToken();
        }
      }
    );
  }, [token]);

  const fetchUser = async () => {
    try {
      const result = await getUser();
      setUser(result?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAdmin = async () => {
    try {
      const result = await getAdmin();
      setAdmin(result?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const changeToken = (token?: string) => {
    const newToken = token ?? "";
    setToken(newToken);
    if (token) {
      setCookie("token", newToken, { path: "/" });
    } else {
      removeCookie("token", { path: "/" });
      removeCookie("role", { path: "/" });
      setUser({});
      setAdmin({});
    }
  };

  const AuthContextValue = {
    token,
    user,
    admin,
    changeToken,
  };

  return <AuthContext.Provider value={AuthContextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
