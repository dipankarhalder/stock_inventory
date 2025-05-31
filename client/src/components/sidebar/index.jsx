import { Link, useLocation } from "react-router-dom";
import { navlinks } from "../../constant/static";
import { MainLogo } from "../auth/Logo";
import { Logout } from "../../icons";
import { useAuthStore } from "../../stores/authStore";

export const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuthStore();

  const currentPath = location.pathname;
  const isLinkActive = (linkPath) =>
    currentPath === linkPath || currentPath.startsWith(linkPath + "/");

  const isDashboardPath = (path) =>
    path === "/admin" || path === "admin" || path === "/admin/";

  return (
    <div className="app_sidebar">
      <div className="app_top_sidebar">
        <div className="app_side_logo">
          <MainLogo />
        </div>
        <div className="app_create_project"></div>
        <div className="app_sidebar_cover">
          {navlinks.map((section) => {
            const sectionIsActive = section.children.some((itm) => {
              const path = itm.path.startsWith("/")
                ? itm.path
                : `/admin/${itm.path}`;
              const isActive = isDashboardPath(path)
                ? currentPath === "/admin"
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
                      : `/admin/${itm.path}`;

                    const isActive = isDashboardPath(linkPath)
                      ? currentPath === "/admin"
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
        <div className="app_logout_inside" onClick={() => logout()}>
          <Logout />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};
