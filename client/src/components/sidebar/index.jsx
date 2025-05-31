import { Link, useLocation } from "react-router-dom";
import { navlinks } from "../../constant/static";
import { MainLogo } from "../auth/Logo";
import { Plus, Logout } from "../../icons";

export const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isLinkActive = (linkPath) =>
    currentPath === linkPath || currentPath.startsWith(linkPath + "/");

  const isDashboardPath = (path) =>
    path === "/admin" || path === "admin" || path === "";

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
          {navlinks.map((section) => {
            // Determine if any child in section is active
            const sectionIsActive = section.children.some((itm) => {
              const path = itm.path.startsWith("/")
                ? itm.path
                : `/admin/${itm.path}`;
              return !isDashboardPath(path) && isLinkActive(path);
            });

            return (
              <div
                className={`app_sideber_item ${
                  sectionIsActive ? "expanded" : ""
                }`}
                key={section.id}
              >
                <p>{section.label}</p>
                <ul>
                  {section.children.map((itm) => {
                    const linkPath = itm.path.startsWith("/")
                      ? itm.path
                      : `/admin/${itm.path}`;
                    const isActive =
                      !isDashboardPath(linkPath) && isLinkActive(linkPath);

                    return (
                      <li
                        key={itm.id}
                        className={isActive ? "active_sidebar" : ""}
                      >
                        <Link to={linkPath}>
                          {itm.icon && <itm.icon />} <p>{itm.label}</p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
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
