import {
  Home,
  Members,
  Teams,
  Analysis,
  Categories,
  Companies,
  Customers,
  Plans,
  Subscribers,
  Approval,
  Transactions,
  Profile,
  Settings,
} from "../icons";

export const navlinks = [
  {
    id: 1,
    label: "Main Menu",
    children: [
      { id: 1, label: "Dashboard", path: "/", icon: Home },
      { id: 3, label: "Members", path: "/", icon: Members },
      { id: 4, label: "Teams", path: "/", icon: Teams },
      { id: 2, label: "Analysis", path: "/", icon: Analysis },
    ],
  },
  {
    id: 2,
    label: "Products",
    children: [
      { id: 1, label: "Categories", path: "/", icon: Categories },
      { id: 2, label: "Companies", path: "/", icon: Companies },
      { id: 3, label: "Customers", path: "/", icon: Customers },
      { id: 4, label: "Plans", path: "/", icon: Plans },
    ],
  },
  {
    id: 3,
    label: "Billings",
    children: [
      { id: 1, label: "Subscribers", path: "/", icon: Subscribers },
      { id: 2, label: "Approval Requests", path: "/", icon: Approval },
      { id: 3, label: "Transactions", path: "/", icon: Transactions },
    ],
  },
  {
    id: 4,
    label: "Personal",
    children: [
      { id: 1, label: "Profile", path: "/", icon: Profile },
      { id: 2, label: "Settings", path: "/", icon: Settings },
    ],
  },
];
