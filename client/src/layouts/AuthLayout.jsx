import { Outlet } from "react-router-dom";
// import { paths } from "@/constant";
// import { Logo } from "@/components/common/logo";
// import { AuthHeading } from "@/components/auth/authHeading";
// import { AuthLinks } from "@/components/auth/authLinks";
// import { Copyright } from "@/components/common/copyright";

export const AuthLayout = () => {
  // const location = useLocation();

  return (
    <section className="">
      <Outlet />
    </section>
  );
};
