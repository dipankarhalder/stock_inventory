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
    <section className="h-screen w-full flex flex-col items-center justify-between bg-indigo-700">
      <div className="relative">
        <div className="mx-auto flex w-full flex-col justify-center space-y-5 sm:w-[460px] py-12 px-8 bg-white shadow-2xl rounded-[8px] mt-[6rem]">
          <div className="flex flex-col text-center mb-6">
            <AuthLogo />
            <h1 className="text-xl font-semibold tracking-tight mb-0">
              {location.pathname === "/registration"
                ? "Create your account"
                : "Hi, welcome back!"}
            </h1>
          </div>
          <Outlet />
        </div>
      </div>
      <p className="mb-[4rem] text-indigo-200 font-medium text-xs">
        Design and developed by:{" "}
        <Link
          to="https://thepixelwiz.in/"
          target="_blank"
          className="font-semibold underline text-yellow-400"
        >
          Pixelwiz Pvt. Ltd.
        </Link>
      </p>
    </section>
  );
};
