import { Outlet, Link } from "react-router-dom";
// import { paths } from "@/constant";
import { MainLogo } from "../components/auth/Logo";
// import { AuthHeading } from "@/components/auth/authHeading";
// import { AuthLinks } from "@/components/auth/authLinks";
// import { Copyright } from "@/components/common/copyright";

export const AuthLayout = () => {
  return (
    <section className="app_main_cover">
      <div className="app_content">
        <div className="app_content_form">
          <MainLogo />
          <Outlet />
        </div>
        <div className="app_content_footer">
          <p>
            &copy; {new Date().getFullYear()}
            <Link to="https://thepixelwiz.in/" target="_blank">
              Pixelwiz Private Limited.
            </Link>
            All Rights Reserved.
          </p>
        </div>
      </div>
    </section>
  );
};
