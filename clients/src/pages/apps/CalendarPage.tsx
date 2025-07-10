import { applinks } from "@/router/links";
import { Header } from "@/components/elements/header";
import { CustomerDataTable } from "@/components/elements/dataTable/CustomerTable";
import { eventColumns } from "@/components/elements/events/Columns";
import { useEventStore } from "@/store/eventStore";

export const CalendarPage = () => {
  const { listEvents } = useEventStore();

  return (
    listEvents && (
      <>
        <Header pagename="Events" />
        <div className="flex w-full px-6 pt-2">
          <CustomerDataTable
            columns={eventColumns}
            data={listEvents}
            heading={"Manage list of Events"}
            filterData={"eventName"}
            btnText={"Add Event"}
            btnLink={applinks.addCollaborators}
          />
        </div>
      </>
    )
  );
};
