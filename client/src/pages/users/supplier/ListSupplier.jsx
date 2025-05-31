import { DataTable } from "../../../shared/table/DataTable";
import { userData } from "../../../constant/user";
import { paths } from "../../../routers/links";

export const ListSupplier = () => {
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
    <>
      <div className="app_main_container">
        <DataTable
          tableTitle="Manage Suppliers"
          data={userData}
          pageSize={10}
          onAction={handleRowAction}
          sortableFields={["id", "name", "email"]}
          isAddBtn={true}
          addBtnContent={"Add Supplier"}
          addBtnLink={paths.userAddTax}
        />
      </div>
    </>
  );
};
