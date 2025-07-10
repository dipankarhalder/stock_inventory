import { applinks } from "@/router/links";
import { useConsumerStore } from "@/store/consumerStore";
import { CustomerDataTable } from "@/components/elements/dataTable/CustomerTable";
import { customerColumns } from "@/components/elements/customer/Columns";

export const ListCustomer = () => {
  const { listConsumer } = useConsumerStore();

  return (
    listConsumer && (
      <CustomerDataTable
        columns={customerColumns}
        data={listConsumer}
        heading={"Manage list of Customers"}
        filterData={"name"}
        btnText={"Add Customer"}
        btnLink={applinks.addCustomer}
      />
    )
  );
};
