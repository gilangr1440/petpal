import Login from "@/pages/auth/login";
import Home from "@/pages/home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "./protected-route";
import Register from "@/pages/auth/register";
import DetailProductByAdmin from "@/pages/admin/module/detail-product";
import EditProfile from "@/pages/edit-profile";
import AllProducts from "@/pages/products";
import Admin from "@/pages/admin";
import AddEditProducts from "@/pages/admin/module/add-edit-product";
import DetailDoctor from "@/pages/detail-doctor";
import ClinicLists from "@/pages/clinic-lists";
import Chat from "@/pages/chat";
import ServiceRequests from "@/pages/admin/module/service-requests";
import Sales from "@/pages/admin/module/sales";
import History from "@/pages/history";
import EditProfileAdmin from "@/pages/admin/module/edit-profile";
import DetailProduct from "@/pages/products/detail-product";
import Payment from "@/pages/transaction";
import AddDoctor from "@/pages/admin/module/add-doctor";

const App = () => {
  const router = createBrowserRouter([
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/products",
          element: <AllProducts />,
        },
        {
          path: "/products/:id",
          element: <DetailProduct />,
        },
        {
          path: "/edit-profile",
          element: <EditProfile />,
        },
        {
          path: "/admin",
          element: <Admin />,
        },
        {
          path: "/admin/edit-profile",
          element: <EditProfileAdmin />,
        },
        {
          path: "/clinic-lists",
          element: <ClinicLists />,
        },
        {
          path: "/detail-doctor/:id",
          element: <DetailDoctor />,
        },
        {
          path: "/admin/products/:product_id",
          element: <DetailProductByAdmin />,
        },
        {
          path: "/admin/products/add-edit",
          element: <AddEditProducts />,
        },
        {
          path: "/chat",
          element: <Chat />,
        },
        {
          path: "/admin/service-requests",
          element: <ServiceRequests />,
        },
        {
          path: "/admin/sales",
          element: <Sales />,
        },
        {
          path: "/history",
          element: <History />,
        },
        {
          path: "/payment/:id",
          element: <Payment />,
        },
        {
          path: "/admin/add-doctor",
          element: <AddDoctor />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
