import { createBrowserRouter } from "react-router-dom";

import { applinks } from "@/router/links";

import { AuthLayout } from "@/layouts/AuthLayout";
import { MainLayout } from "@/layouts/MainLayout";
import { ErrorPage } from "@/pages/ErrorPage";

import { SigninPage } from "@/pages/auth/SigninPage";
import { SignupPage } from "@/pages/auth/SignupPage";
import { DashboardPage } from "@/pages/apps/DashboardPage";
import { CustomersPage } from "@/pages/apps/CustomersPage";
import { ListCustomer } from "@/pages/apps/Customer/ListCustomer";
import { AddCustomer } from "@/pages/apps/Customer/AddCustomer";
import { ViewCustomer } from "@/pages/apps/Customer/ViewCustomer";
import { InvoiceCustomer } from "@/pages/apps/Customer/InvoiceCustomer";
import { VendorsPage } from "@/pages/apps/VendorsPage";
import { CalendarPage } from "@/pages/apps/CalendarPage";
import { BillingsPage } from "@/pages/apps/BillingsPage";
import { ProfilePage } from "@/pages/apps/ProfilePage";
import { ViewProfile } from "@/pages/apps/Profile/ViewProfile";
import { EditProfile } from "@/pages/apps/Profile/EditProfile";

export const router = createBrowserRouter([
  {
    path: applinks.login,
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <SigninPage />,
      },
      {
        path: applinks.register,
        element: <SignupPage />,
      },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: applinks.dashboard,
        element: <DashboardPage />,
      },
      {
        path: applinks.customers,
        element: <CustomersPage />,
        children: [
          {
            index: true,
            element: <ListCustomer />,
          },
          {
            path: applinks.addCustomer,
            element: <AddCustomer />,
          },
          {
            path: applinks.customerId,
            element: <ViewCustomer />,
          },
          {
            path: `view/${applinks.viewTransaction}`,
            element: <InvoiceCustomer />,
          },
          {
            path: `${applinks.customerId}/update`,
            element: <AddCustomer />,
          },
        ],
      },
      {
        path: applinks.vendors,
        element: <VendorsPage />,
      },
      {
        path: applinks.calendar,
        element: <CalendarPage />,
      },
      {
        path: applinks.billing,
        element: <BillingsPage />,
      },
      {
        path: applinks.profile,
        element: <ProfilePage />,
        children: [
          {
            index: true,
            element: <ViewProfile />,
          },
          {
            path: applinks.editUser,
            element: <EditProfile />,
          },
        ],
      },
    ],
  },
]);
