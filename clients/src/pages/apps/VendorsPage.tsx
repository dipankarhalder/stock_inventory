import { applinks } from "@/router/links";
import { Header } from "@/components/elements/header";
import { CustomerDataTable } from "@/components/elements/dataTable/CustomerTable";
import { vendorsColumns } from "@/components/elements/vendors/Columns";
import { useProfileStore } from "@/store/profileStore";

export const VendorsPage = () => {
  const { listprofile } = useProfileStore();

  return (
    listprofile && (
      <>
        <Header pagename="Collaborators" />
        <div className="flex w-full px-6 pt-2">
          <CustomerDataTable
            columns={vendorsColumns}
            data={listprofile}
            heading={"Manage list of Collaborators"}
            filterData={"name"}
            btnText={"Add Collaborator"}
            btnLink={applinks.addCollaborators}
          />
        </div>
      </>
    )
  );
};
