import { Link } from "react-router-dom";

export const SignupLink = () => {
  return (
    <div className="text-center">
      <p className="text-sm mt-2 font-medium text-slate-500">
        If you have already account. &nbsp;
        <Link
          to={"/"}
          className="font-medium underline text-blue-800 hover:text-[#1A2C95]"
        >
          Login now
        </Link>
      </p>
    </div>
  );
};
