import React from "react";
import { useCookies } from "react-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const [cookies] = useCookies<any>(["token", "role"]);
  const { pathname } = useLocation();

  const authProtected = ["/login", "/register"];
  const protectedByToken = ["/edit-profile", "/admin", "/admin/edit-profile", "/admin/products/:product_id", "admin/products/add-edit", "/chat", "/admin/service-requests", "/admin/sales", "/history", "payment", "/admin/add-doctor"];
  const userProtected = ["/edit-profile", "/history", "/payment"];
  const adminProtected = ["/admin", "/admin/edit-profile", "/admin/products/:product_id", "admin/products/add-edit", "/admin/service-requests", "/admin/sales", "/admin/add-doctor"];

  if (authProtected.includes(pathname)) {
    if (cookies.token) return <Navigate to={"/"} />;
  }
  if (protectedByToken.includes(pathname)) {
    if (!cookies.token) {
      return <Navigate to={"/login"} />;
    }

    if (userProtected.includes(pathname)) {
      if (cookies.role == "admin") {
        return <Navigate to={"/admin"} />;
      }
    }

    if (adminProtected.includes(pathname)) {
      if (cookies.role == "user") {
        return <Navigate to={"/"} />;
      }
    }
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
