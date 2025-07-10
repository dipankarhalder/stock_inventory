import { Outlet } from "react-router-dom";
import { Header } from "@/components/elements/header";
import { ConsumerPopup } from "@/pages/apps/Customer/ConsumerPopup";
import { DeleteCustomerPopup } from "@/pages/apps/Customer/DeleteCustomerPopup";
import { useConsumerStore } from "@/store/consumerStore";

export const CustomersPage = () => {
  const { addFormPop, deletePop } = useConsumerStore();

  return (
    <>
      <Header pagename="Customers" />
      <div className="flex w-full px-6 pt-2">
        <Outlet />
        {addFormPop && <ConsumerPopup />}
        {deletePop && <DeleteCustomerPopup />}
      </div>
    </>
  );
};
