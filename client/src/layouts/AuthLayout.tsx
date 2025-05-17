import { Outlet } from "react-router-dom";
import { Logo } from "@/components/common/logo";
import { AuthHeading } from "@/components/auth/authHeading";
import { AuthLinks } from "@/components/auth/authLinks";
import { Copyright } from "@/components/common/copyright";

export const AuthLayout = () => {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-between">
      <div className="relative">
        <div className="mx-auto flex w-full flex-col justify-center items-center space-y-5 sm:w-[460px] mt-[2rem]">
          <div className="w-full pt-12 pb-20 px-16 bg-white shadow-2xl rounded-[8px]">
            <div className="mb-8 flex justify-center">
              <Logo />
            </div>
            <div className="flex flex-col text-center mb-6">
              <AuthHeading />
            </div>
            <Outlet />
          </div>
          <AuthLinks />
        </div>
      </div>
      <div className="mb-[2rem] text-center">
        <Copyright />
      </div>
    </section>
  );
};
