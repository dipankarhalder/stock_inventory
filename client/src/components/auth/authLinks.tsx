import { useLocation, Link } from "react-router-dom";
import { paths } from "@/constant";

export const AuthLinks = () => {
  const location = useLocation();

  return location.pathname === paths.register ? (
    <p className="font-medium text-sm text-slate-500 mt-2">
      If you have already account. &nbsp;
      <Link
        to={paths.login}
        className="font-medium text-sm theme-text hover:underline"
      >
        Login now
      </Link>
    </p>
  ) : (
    <p className="font-medium text-sm text-slate-500 mt-2">
      Don&apos;t have an account? &nbsp;
      <Link
        to={paths.register}
        className="font-medium text-sm theme-text hover:underline"
      >
        Create now
      </Link>
    </p>
  );
};
