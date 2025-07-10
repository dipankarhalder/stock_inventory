import {
  Combine,
  Ticket,
  CircleUser,
  Baby,
  House,
  CalendarFold,
} from "lucide-react";
import { applinks } from "@/router/links";

export const navData = {
  user: {
    name: "Dipankar Halder",
    email: "dipankar@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Drishtikon",
      logo: Baby,
      plan: "Task Planers",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: applinks.dashboard,
      icon: House,
      color: "text-indigo-500",
    },
    {
      title: "Collaborators",
      url: applinks.vendors,
      icon: Combine,
      color: "text-indigo-500",
    },
    {
      title: "Customers",
      url: applinks.customers,
      icon: CircleUser,
      color: "text-indigo-500",
    },
    {
      title: "Events",
      url: applinks.calendar,
      icon: CalendarFold,
      color: "text-indigo-500",
    },
    {
      title: "Billings",
      url: applinks.billing,
      icon: Ticket,
      color: "text-indigo-500",
    },
  ],
};
