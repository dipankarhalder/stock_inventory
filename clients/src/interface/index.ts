import { ReactNode } from "react";
import { type LucideIcon } from "lucide-react";

export interface IChildren {
  children: ReactNode;
}

export interface IUserSignin {
  email: string;
  password: string;
}

export interface IUserRequest {
  name: string;
  role: string;
  phone: string;
  email: string;
  password: string;
}

export interface IPageLink {
  pagename: string;
}

export interface IMainNav {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    color: string;
  }[];
}

export interface ISideUser {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}

export interface ITeams {
  teams: {
    name: string;
    logo: React.ElementType;
    plan: string;
  }[];
}

export type IUserInfo = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    area: string;
    landmark: string;
    city: string;
    state: string;
    pincode: string;
  };
};

export type IVendorInfo = {
  name: string;
  email: string;
  phone: string;
  address: string;
  type: string;
};
