import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/sidebar";

export const AdminLayout = () => {
  return (
    <div className="app_admin_cover">
      <Sidebar />
      <div className="app_main_content_area">
        <Outlet />
      </div>
    </div>
  );
};
