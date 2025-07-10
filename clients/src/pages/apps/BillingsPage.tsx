import { applinks } from "@/router/links";
import { Header } from "@/components/elements/header";
import { CustomerDataTable } from "@/components/elements/dataTable/CustomerTable";
import { billingColumns } from "@/components/elements/billing/Columns";
import { useTransactionStore } from "@/store/billStore";

export const BillingsPage = () => {
  const { listTransactions } = useTransactionStore();

  return (
    listTransactions && (
      <>
        <Header pagename="Billings" />
        <div className="flex w-full px-6 pt-2">
          <CustomerDataTable
            columns={billingColumns}
            data={listTransactions}
            heading={"Manage list of Billings"}
            filterData={"paidAmount"}
            btnText={"Add Billings"}
            btnLink={applinks.addCollaborators}
          />
        </div>
      </>
    )
  );
};
