import { Outlet } from "react-router-dom";
import { Copyright } from "@/components/auth/copyright";

export const AuthLayout = () => {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-between">
      <div className="relative">
        <div className="mx-auto flex w-full flex-col justify-center space-y-5 sm:w-[460px] py-12 px-8 bg-white shadow-2xl rounded-[8px] mt-[6rem]">
          <div className="flex flex-col text-center mb-6">
            <h1 className="text-2xl font-semibold tracking-tight mb-0">
              Create your account
            </h1>
          </div>
          <Outlet />
        </div>
      </div>
      <Copyright />
    </section>
  );
};
