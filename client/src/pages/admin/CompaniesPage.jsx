import { Breadcrumb } from "../../shared/breadcrumb/Breadcrumb";
import { DataTable } from "../../shared/table/DataTable";
import { companyData } from "../../constant/company";

const breadcrumbData = [
  { title: "Admin", path: "/admin" },
  { title: "Manage companies" },
];

export const CompaniesPage = () => {
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

  const companyInfo = companyData.map((user) => ({
    id: user.id,
    company_name: user.company_name,
    name: user.owner_name,
    email: user.owner_email,
    phone: user.owner_phone,
    payment_date: user.payment_date,
    paid: user.paid,
    approve: user.approve,
  }));

  return (
    <div className="app_page_insides">
      <Breadcrumb items={breadcrumbData} />
      <div className="app_main_container">
        <DataTable
          tableTitle="Manage Companies"
          data={companyInfo}
          pageSize={10}
          onAction={handleRowAction}
          sortableFields={["id", "name", "email"]}
        />
      </div>
    </div>
  );
};
