import { Outlet, Navigate } from "react-router-dom";
import { paths } from "../routers/links";
import { Sidebar } from "../components/sidebar";
import { useAuthStore } from "../stores/authStore";

export const AdminLayout = () => {
  const { isToken, isRole } = useAuthStore();

  if (!isToken && !isRole) {
    return <Navigate to={paths.login} />;
  }

  return (
    <div className="app_admin_cover">
      <Sidebar />
      <div className="app_main_content_area">
        <Outlet />
      </div>
    </div>
  );
};
