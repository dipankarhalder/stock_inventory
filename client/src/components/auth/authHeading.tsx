import { useLocation } from "react-router-dom";
import { paths } from "@/constant";

export const AuthHeading = () => {
  const location = useLocation();

  return (
    <h1 className="text-xl font-medium tracking-tight mb-0">
      {location.pathname === paths.register
        ? "Create an account"
        : "Hi, Welcome back!"}
    </h1>
  );
};
