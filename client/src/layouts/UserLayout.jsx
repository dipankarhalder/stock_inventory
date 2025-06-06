import { Outlet, Navigate } from "react-router-dom";
import { paths } from "../routers/links";
import { UserSidebar } from "../components/sidebar/UserSidebar";
import { useAuthStore } from "../stores/authStore";
import { usePopStore } from "../stores/popStore";
import { ShopPopup } from "../components/users/ShopPopup";

export const UserLayout = () => {
  const { isToken, isRole } = useAuthStore();
  const { isPopOpen } = usePopStore();

  if (!isToken && !isRole) {
    return <Navigate to={paths.login} />;
  }

  return (
    <>
      <div className="app_admin_cover">
        <UserSidebar />
        <div className="app_main_content_area">
          <Outlet />
        </div>
      </div>
      {isPopOpen && <ShopPopup />}
    </>
  );
};
