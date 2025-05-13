import { useMemo } from "react";
import { Link } from "react-router-dom";

export const Copyright = () => {
  const currentYear = useMemo(() => {
    console.log("Calculating year...");
    return new Date().getFullYear();
  }, []);

  return (
    <div className="mb-[4rem] text-center">
      <p className="text-slate-500 font-medium text-sm">
        &copy; {currentYear}{" "}
        <Link
          to="https://thepixelwiz.in/"
          target="_blank"
          className="font-semibold text-slate-900 ml-1 mr-1 text-sm theme-text"
        >
          Pixelwiz Pvt. Ltd.
        </Link>
        All rights reserved.
      </p>
    </div>
  );
};
