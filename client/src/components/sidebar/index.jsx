import { Link } from "react-router-dom";
import { navlinks } from "../../constant/static";
import { MainLogo } from "../auth/Logo";
import { Plus, Logout } from "../../icons";

export const Sidebar = () => {
  return (
    <div className="app_sidebar">
      <div className="app_top_sidebar">
        <div className="app_side_logo">
          <MainLogo />
        </div>
        <div className="app_create_project">
          <Link to="/">
            <Plus /> Create Project
          </Link>
        </div>
        <div className="app_sidebar_cover">
          {navlinks.map((item) => (
            <div className="app_sideber_item" key={item.id}>
              <p>{item.label}</p>
              <ul>
                {item.children.map((itm) => (
                  <li key={itm.id}>
                    <Link to={itm.path}>
                      {itm.icon && <itm.icon />} <p>{itm.label}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="app_logout">
        <div className="app_logout_inside">
          <Logout />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};
