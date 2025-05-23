import { Link } from "react-router-dom";

export const Copyright = () => {
  return (
    <div className="app_content_footer">
      <p>
        &copy; {new Date().getFullYear()}
        <Link to="https://thepixelwiz.in/" target="_blank">
          Pixelwiz Private Limited.
        </Link>
        All Rights Reserved.
      </p>
    </div>
  );
};
