import {
  Home,
  Members,
  Teams,
  Analysis,
  Categories,
  SubCategories,
  Companies,
  Customers,
  Plans,
  Subscribers,
  Approval,
  Transactions,
  Profile,
  Settings,
  Stocks,
  Supplier,
  Taxes,
  Discount,
  Billings,
  Location,
} from "../icons";
import { paths } from "../routers/links";

export const navlinks = [
  {
    id: 1,
    label: "Main Menu",
    children: [
      { id: 1, label: "Dashboard", path: paths.adminDashboard, icon: Home },
      { id: 3, label: "Members", path: paths.adminMembers, icon: Members },
      { id: 4, label: "Teams", path: paths.adminTeams, icon: Teams },
      { id: 2, label: "Analysis", path: paths.adminAnalysis, icon: Analysis },
    ],
  },
  {
    id: 2,
    label: "Products",
    children: [
      {
        id: 1,
        label: "Categories",
        path: paths.adminCategories,
        icon: Categories,
      },
      {
        id: 2,
        label: "Companies",
        path: paths.adminCompanies,
        icon: Companies,
      },
      {
        id: 3,
        label: "Customers",
        path: paths.adminCustomers,
        icon: Customers,
      },
      { id: 4, label: "Plans", path: paths.adminPlans, icon: Plans },
    ],
  },
  {
    id: 3,
    label: "Billings",
    children: [
      {
        id: 1,
        label: "Subscribers",
        path: paths.adminSubscribers,
        icon: Subscribers,
      },
      {
        id: 2,
        label: "Approval Requests",
        path: paths.adminApproval,
        icon: Approval,
      },
      {
        id: 3,
        label: "Transactions",
        path: paths.adminTransactions,
        icon: Transactions,
      },
    ],
  },
  {
    id: 4,
    label: "Personal",
    children: [
      { id: 1, label: "Profile", path: paths.adminProfile, icon: Profile },
      { id: 2, label: "Settings", path: paths.adminSettings, icon: Settings },
    ],
  },
];

export const navUserlinks = [
  {
    id: 1,
    label: "Main Menu",
    children: [
      { id: 1, label: "Dashboard", path: paths.userDashboard, icon: Home },
      { id: 3, label: "Members", path: paths.userMembers, icon: Members },
      { id: 2, label: "Analysis", path: paths.adminAnalysis, icon: Analysis },
      { id: 4, label: "Location", path: paths.adminAnalysis, icon: Location },
    ],
  },
  {
    id: 2,
    label: "Shops",
    children: [
      {
        id: 1,
        label: "Categories",
        path: paths.userCategories,
        icon: Categories,
      },
      {
        id: 4,
        label: "Sub Categories",
        path: paths.adminCategories,
        icon: SubCategories,
      },
      {
        id: 2,
        label: "Products",
        path: paths.adminCompanies,
        icon: Companies,
      },
      {
        id: 3,
        label: "Stocks",
        path: paths.adminCustomers,
        icon: Stocks,
      },
      {
        id: 5,
        label: "Suppliers",
        path: paths.userSuppliers,
        icon: Supplier,
      },
    ],
  },
  {
    id: 3,
    label: "Taxes and Discounts",
    children: [
      {
        id: 1,
        label: "Taxes",
        path: paths.userTaxes,
        icon: Taxes,
      },
      {
        id: 4,
        label: "Discounts",
        path: paths.adminSubscribers,
        icon: Discount,
      },
    ],
  },
  {
    id: 5,
    label: "Billings",
    children: [
      {
        id: 2,
        label: "Billings",
        path: paths.adminApproval,
        icon: Billings,
      },
      {
        id: 3,
        label: "Invoices",
        path: paths.adminTransactions,
        icon: Transactions,
      },
    ],
  },
  {
    id: 4,
    label: "Personal",
    children: [
      { id: 1, label: "Profile", path: paths.adminProfile, icon: Profile },
    ],
  },
];
