import { Breadcrumb } from "../../shared/breadcrumb/Breadcrumb";
import { DataTable } from "../../shared/table/DataTable";
import { userData } from "../../constant/user";

const breadcrumbData = [
  { title: "Admin", path: "/admin" },
  { title: "Members" },
];

export const MembersPage = () => {
  const handleRowAction = (actionType, rowData) => {
    console.log("Action:", actionType);
    console.log("Row Data:", rowData);

    if (actionType === "edit") {
      // handle edit logic
    } else if (actionType === "view") {
      // handle view logic
    } else if (actionType === "delete") {
      // handle delete logic
    }
  };

  return (
    <div className="app_page_insides">
      <Breadcrumb items={breadcrumbData} />
      <DataTable data={userData} pageSize={5} onAction={handleRowAction} />
    </div>
  );
};
