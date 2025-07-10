import moment from "moment";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useEventStore } from "@/store/eventStore";

const groupEventsByDate = (data: any) => {
  return data.reduce((groups: any, event: any) => {
    const date = event.eventDate;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(event);
    return groups;
  }, {});
};

export const EventList = () => {
  const { listEvents } = useEventStore();
  const newStructData = listEvents && groupEventsByDate(listEvents);

  return (
    <div className="w-[30%] border-l border-slate-200 pl-4">
      <h4 className="text-md font-semibold mb-4">Upcoming Events List</h4>
      <div
        className="flex flex-col overflow-y-scroll"
        style={{ height: "calc(100vh - 180px)" }}
      >
        {newStructData &&
          Object.keys(newStructData).map((idx: any) => (
            <div className="flex flex-col mb-5" key={idx}>
              <p className="text-xs font-medium text-slate-900 mb-2">
                {moment(idx).format("LL")}
              </p>
              {newStructData[idx].length ? (
                newStructData[idx].map((item: any) => (
                  <div
                    className="flex border border-slate-300 p-3 rounded-md shadow items-center relative overflow-hidden mb-2"
                    key={item._id}
                  >
                    <div className="flex flex-col w-[60px] h-[60px] items-center border border-slate-100 bg-slate-100 rounded-md mr-3 gap-0 overflow-hidden">
                      <span className="font-light text-xl text-black w-full text-center py-[4px]">
                        4:00
                      </span>
                      <span className="font-medium text-xs text-white text-center bg-red-600 w-full py-[3px]">
                        PM
                      </span>
                    </div>
                    <div className="w-[75%]">
                      <h6 className="text-sm font-semibold mb-1 text-gray-600">
                        {item.eventName}
                      </h6>
                      <p className="text-xs font-medium text-slate-400">
                        <span className="mr-2">Address:</span>
                        <span className="text-slate-700 font-semibold">
                          {item.consumer.address.area},{" "}
                          {item.consumer.address.landmark},{" "}
                          {item.consumer.address.city},{" "}
                          {item.consumer.address.state},{" "}
                          {item.consumer.address.pincode}
                        </span>
                      </p>
                    </div>
                    <Link
                      to="/"
                      className="absolute w-[50px] h-full top-0 right-0 flex items-center justify-center"
                    >
                      <ChevronRight />
                    </Link>
                  </div>
                ))
              ) : (
                <div className="h-[500px]">
                  <p className="font-medium text-xs text-gray-400 border px-4 py-8 rounded-md text-center">
                    The event list is empty
                  </p>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};
