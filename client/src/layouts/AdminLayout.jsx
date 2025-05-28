import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/sidebar";

export const AdminLayout = () => {
  return (
    <div className="app_admin_cover">
      <Sidebar />
      <Outlet />
    </div>
  );
};
