import { Outlet, useLocation, Navigate, Link } from "react-router-dom";
import { AuthLogo } from "@/components/elements/auth/AuthLogo";
import { applinks } from "@/router/links";

export const AuthLayout = () => {
  const location = useLocation();
  const isToken = localStorage && localStorage.getItem("token");
  const isLogin = localStorage && localStorage.getItem("isLogin");

  if (isToken && isLogin) {
    return <Navigate to={applinks.dashboard} />;
  }

  return (
    <section className="w-full flex relative">
      <div className="w-[50%] h-screen bg-slate-100 flex flex-col items-center justify-center">
        <div className="flex flex-col justify-center space-y-5 w-[400px]">
          <div className="flex flex-col text-center mb-6">
            <AuthLogo />
            <h1 className="text-xl font-medium tracking-tight mb-0">
              {location.pathname === "/registration"
                ? "Create your account"
                : "Welcome back!"}
            </h1>
            <p className="text-sm font-medium px-[5rem] mt-3 text-slate-500">
              {location.pathname === "/registration"
                ? ""
                : "Sign in to access your dashboard, settings and projects"}
            </p>
          </div>
          <Outlet />
        </div>
        <p className="text-slate-600 font-medium text-xs absolute bottom-8">
          Design and developed by:&nbsp;&nbsp;
          <Link
            to="https://thepixelwiz.in/"
            target="_blank"
            className="font-semibold text-blue-800 underline hover:text-[#1A2C95]"
          >
            Pixelwiz Private Limited
          </Link>
        </p>
      </div>
      <div className="w-[50%] h-screen bg-[#1A2C95]"></div>
    </section>
  );
};
