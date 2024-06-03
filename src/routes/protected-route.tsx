import React from "react";
import { useCookies } from "react-cookie";
import { Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const [cookies] = useCookies<any>(["token", "role"]);
  const { pathname } = useLocation();

  const authProtected = ["/login", "/register"];

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
