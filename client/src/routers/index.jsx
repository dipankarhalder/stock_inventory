import { createBrowserRouter } from "react-router-dom";
import { paths } from "./links";

import { AuthLayout } from "@/layouts/AuthLayout";
import { AdminLayout } from "@/layouts/AdminLayout";

import { ErrorPage } from "@/pages/common/ErrorPage";
import { SigninPage } from "@/pages/auth/SigninPage";
import { SignupPage } from "@/pages/auth/SignupPage";

import { AdminDashboardPage } from "@/pages/admin/DashboardPage";

export const router = createBrowserRouter([
  {
    path: paths.login,
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <SigninPage />,
      },
      {
        path: paths.register,
        element: <SignupPage />,
      },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: paths.adminDashboard,
        element: <AdminDashboardPage />,
      },
    ],
  },
]);
