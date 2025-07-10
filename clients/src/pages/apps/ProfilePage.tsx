import { Outlet } from "react-router-dom";
import { Header } from "@/components/elements/header";

export const ProfilePage = () => {
  return (
    <>
      <Header pagename="My Profile" />
      <div className="flex w-full px-6 pt-2">
        <Outlet />
      </div>
    </>
  );
};
