import React from "react";
import { Link } from "react-router-dom";

const CopyrightComponent = () => {
  return (
    <div className="mb-[4rem] text-center">
      <p className="text-slate-500 font-medium text-sm">
        &copy; {new Date().getFullYear()}
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

export const Copyright = React.memo(CopyrightComponent);
