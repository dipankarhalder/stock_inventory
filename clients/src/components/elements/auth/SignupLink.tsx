import { Link } from "react-router-dom";

export const SignupLink = () => {
  return (
    <div className="text-center text-sm mt-2">
      <p>
        If you have already account. &nbsp;
        <Link to={"/"} className="font-medium underline hover:text-indigo-700">
          Login now
        </Link>
      </p>
    </div>
  );
};
