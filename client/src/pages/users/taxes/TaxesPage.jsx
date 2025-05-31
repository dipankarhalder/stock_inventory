import { Outlet } from "react-router-dom";
import { Breadcrumb } from "../../../shared/breadcrumb/Breadcrumb";

const breadcrumbData = [
  { title: "Users", path: "/users" },
  { title: "Manage Taxes" },
];

export const TaxesPage = () => {
  return (
    <div className="app_page_insides">
      <Breadcrumb items={breadcrumbData} />
      <Outlet />
    </div>
  );
};
