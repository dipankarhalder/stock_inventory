import { useEffect, useContext, useRef } from "react";
import moment from "moment";
import { DataTable } from "../../../shared/table/DataTable";
import { paths } from "../../../routers/links";
import { toastStatus } from "../../../constant";
import { listCategoriesService } from "../../../services/endpoints";
import { ToastContext } from "../../../shared/toast/context/ToastContext";
import { getServices } from "../../../services/core.services";
import { useCategoryStore } from "../../../stores/categoryStore";
import { handleApiErrorToast } from "../../../utils/handleApiErrorToast";

export const ListUserCategories = () => {
  const hasFetched = useRef(false);
  const { addToast } = useContext(ToastContext);
  const { isLoading, isCategoryData, setLoading, setCategory } =
    useCategoryStore();

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
    if (hasFetched.current) return;
    hasFetched.current = true;

    setLoading(true);
    const getSupplier = async () => {
      try {
        const res = await getServices(listCategoriesService);
        const isError = await handleApiErrorToast(res, addToast, toastStatus);
        if (isError) return;

        setCategory(res.data.data);
      } finally {
        setLoading(false);
      }
    };

    getSupplier();
  }, [addToast, setLoading, setCategory]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const categoryNewArr =
    isCategoryData &&
    isCategoryData.map((item) => ({
      id: `...${item._id.slice(-4)}`,
      categoryName: item.categoryName,
      categoryCode: item.categoryCode,
      status: item.status,
      createdAt: moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
      createdBy: `${item.user.firstName} ${item.user.lastName}`,
    }));

  return (
    <div className="app_main_container">
      <DataTable
        tableTitle="Manage Categories"
        data={categoryNewArr}
        pageSize={10}
        onAction={handleRowAction}
        sortableFields={["id", "categoryName", "email"]}
        isAddBtn={true}
        addBtnContent={"Add Category"}
        addBtnLink={paths.userAddSupplier}
      />
    </div>
  );
};
