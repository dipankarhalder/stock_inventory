import { Link, useLocation } from "react-router-dom";
import { navUserlinks } from "../../constant/static";
import { MainLogo } from "../auth/Logo";
import { Plus, Logout } from "../../icons";

export const UserSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isLinkActive = (linkPath) =>
    currentPath === linkPath || currentPath.startsWith(linkPath + "/");

  const isDashboardPath = (path) =>
    path === "/users" || path === "users" || path === "/users/";

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
          {navUserlinks.map((section) => {
            const sectionIsActive = section.children.some((itm) => {
              const path = itm.path.startsWith("/")
                ? itm.path
                : `/users/${itm.path}`;
              const isActive = isDashboardPath(path)
                ? currentPath === "/users"
                : isLinkActive(path);
              return isActive;
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
                      : `/users/${itm.path}`;

                    const isActive = isDashboardPath(linkPath)
                      ? currentPath === "/users"
                      : isLinkActive(linkPath);

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
