import { useEffect, useContext } from "react";
import { DataTable } from "../../../shared/table/DataTable";
import { paths } from "../../../routers/links";
import { toastStatus } from "../../../constant";
import { ListSupplierService } from "../../../services/endpoints";
import { ToastContext } from "../../../shared/toast/context/ToastContext";
import { getServices } from "../../../services/core.services";
import { useSupplierStore } from "../../../stores/supplierStore";
import { handleApiErrorToast } from "../../../utils/handleApiErrorToast";

export const ListSupplier = () => {
  const { addToast } = useContext(ToastContext);
  const { isLoading, isSupplierData, setLoading, setSupplier } =
    useSupplierStore();

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

  useEffect(() => {
    setLoading(true);
    const getSupplier = async () => {
      try {
        const res = await getServices(ListSupplierService);
        const isError = await handleApiErrorToast(res, addToast, toastStatus);
        if (isError) return;

        setSupplier(res.data.data);
      } finally {
        setLoading(false);
      }
    };

    getSupplier();
  }, [addToast, setLoading, setSupplier]);

  if (isLoading) {
    <div>Loading...</div>;
  }

  const suppliersNewArr =
    isSupplierData &&
    isSupplierData.map((item) => ({
      id: item.supId,
      name: item.name,
      email: item.email,
      phone: item.phone,
      company: item.company,
      status: item.status,
    }));

  return (
    <>
      <div className="app_main_container">
        <DataTable
          tableTitle="Manage Suppliers"
          data={suppliersNewArr}
          pageSize={10}
          onAction={handleRowAction}
          sortableFields={["id", "name", "email"]}
          isAddBtn={true}
          addBtnContent={"Add Supplier"}
          addBtnLink={paths.userAddSupplier}
        />
      </div>
    </>
  );
};
