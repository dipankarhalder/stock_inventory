import { Outlet } from "react-router-dom";
import { MainLogo } from "../components/auth/Logo";
import { Copyright } from "../components/auth/Copyright";

export const AuthLayout = () => {
  return (
    <section className="app_main_cover">
      <div className="app_content">
        <div className="app_content_form">
          <MainLogo />
          <Outlet />
        </div>
        <Copyright />
      </div>
    </section>
  );
};
