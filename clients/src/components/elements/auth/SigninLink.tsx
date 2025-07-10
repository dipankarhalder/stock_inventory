import { Link } from "react-router-dom";
import { applinks } from "@/router/links";

export const SigninLink = () => {
  return (
    <div className="text-center">
      <p className="text-sm mt-2 font-medium text-slate-500">
        Don&apos;t have an account? &nbsp;
        <Link
          to={applinks.register}
          className="font-medium underline text-blue-800 hover:text-[#1A2C95]"
        >
          Create now
        </Link>
      </p>
    </div>
  );
};
