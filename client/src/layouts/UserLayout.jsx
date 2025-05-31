import { Outlet } from "react-router-dom";
import { UserSidebar } from "../components/sidebar/UserSidebar";

export const UserLayout = () => {
  return (
    <div className="app_admin_cover">
      <UserSidebar />
      <div className="app_main_content_area">
        <Outlet />
      </div>
    </div>
  );
};
