import { createBrowserRouter } from "react-router-dom";
import { paths } from "./links";

// layouts and error
import { AuthLayout } from "../layouts/AuthLayout";
import { AdminLayout } from "../layouts/AdminLayout";
import { UserLayout } from "../layouts/UserLayout";
import { ErrorPage } from "../pages/common/ErrorPage";

// authentication
import { SigninPage } from "../pages/auth/SigninPage";
import { SignupPage } from "../pages/auth/SignupPage";
import { ForgotPassPage } from "../pages/auth/ForgotPassPage";
import { CreatePassword } from "../pages/auth/CreatePassword";

// admin
import { AdminDashboardPage } from "../pages/admin/DashboardPage";
import { MembersPage } from "../pages/admin/MembersPage";
import { TeamsPage } from "../pages/admin/TeamsPage";
import { AnalysisPage } from "../pages/admin/AnalysisPage";
import { CategoriesPage } from "../pages/admin/CategoriesPage";
import { CompaniesPage } from "../pages/admin/CompaniesPage";
import { CustomersPage } from "../pages/admin/CustomersPage";
import { PlansPage } from "../pages/admin/PlansPage";
import { SubscribersPage } from "../pages/admin/SubscribersPage";
import { ApprovalPage } from "../pages/admin/ApprovalPage";
import { TransactionsPage } from "../pages/admin/TransactionsPage";
import { ProfilePage } from "../pages/admin/ProfilePage";
import { SettingsPage } from "../pages/admin/SettingsPage";

// users
import { UserDashboardPage } from "../pages/users/DashboardPage";
import { UserMembersPage } from "../pages/users/MembersPage";

// categories
import { UserCategoriesPage } from "../pages/users/categories/CategoriesPage";
import { ListUserCategories } from "../pages/users/categories/ListUserCategories";
import { AddUserCategory } from "../pages/users/categories/AddCategory";

// User taxes
import { TaxesPage } from "../pages/users/taxes/TaxesPage";
import { ListTaxes } from "../pages/users/taxes/ListTaxes";
import { AddTax } from "../pages/users/taxes/AddTax";

// user suppliers
import { SupplierPage } from "../pages/users/supplier/SupplierPage";
import { ListSupplier } from "../pages/users/supplier/ListSupplier";
import { AddSupplier } from "../pages/users/supplier/AddSupplier";

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
      {
        path: paths.forgot,
        element: <ForgotPassPage />,
      },
      {
        path: paths.createpassword,
        element: <CreatePassword />,
      },
    ],
  },
  {
    path: paths.adminDashboard,
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboardPage />,
      },
      {
        path: paths.adminMembers,
        element: <MembersPage />,
      },
      {
        path: paths.adminTeams,
        element: <TeamsPage />,
      },
      {
        path: paths.adminAnalysis,
        element: <AnalysisPage />,
      },
      {
        path: paths.adminCategories,
        element: <CategoriesPage />,
      },
      {
        path: paths.adminCompanies,
        element: <CompaniesPage />,
      },
      {
        path: paths.adminCustomers,
        element: <CustomersPage />,
      },
      {
        path: paths.adminPlans,
        element: <PlansPage />,
      },
      {
        path: paths.adminSubscribers,
        element: <SubscribersPage />,
      },
      {
        path: paths.adminApproval,
        element: <ApprovalPage />,
      },
      {
        path: paths.adminTransactions,
        element: <TransactionsPage />,
      },
      {
        path: paths.adminProfile,
        element: <ProfilePage />,
      },
      {
        path: paths.adminSettings,
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: paths.userDashboard,
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <UserDashboardPage />,
      },
      {
        path: paths.userMembers,
        element: <UserMembersPage />,
      },

      // categories
      {
        path: paths.userCategories,
        element: <UserCategoriesPage />,
        children: [
          {
            index: true,
            element: <ListUserCategories />,
          },
          {
            path: paths.userAddSupplier,
            element: <AddUserCategory />,
          },
        ],
      },

      // suppliers
      {
        path: paths.userSuppliers,
        element: <SupplierPage />,
        children: [
          {
            index: true,
            element: <ListSupplier />,
          },
          {
            path: paths.userAddSupplier,
            element: <AddSupplier />,
          },
        ],
      },

      // taxes
      {
        path: paths.userTaxes,
        element: <TaxesPage />,
        children: [
          {
            index: true,
            element: <ListTaxes />,
          },
          {
            path: paths.userAddTax,
            element: <AddTax />,
          },
        ],
      },
    ],
  },
]);
