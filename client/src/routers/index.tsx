import { createBrowserRouter } from "react-router-dom";
import { paths } from "@/constant";
import { AuthLayout } from "@/layouts/AuthLayout";
import { ErrorPage } from "@/pages/ErrorPage";
import { SigninPage } from "@/pages/auth/SigninPage";
import { SignupPage } from "@/pages/auth/SignupPage";

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
]);
