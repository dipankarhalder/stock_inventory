import { Link } from "react-router-dom";
import { applinks } from "@/router/links";
import { Combine, CircleUser, CalendarFold } from "lucide-react";
import { Header } from "@/components/elements/header";
import { EventList } from "@/components/elements/dashboard/EventList";

export const DashboardPage = () => {
  return (
    <>
      <Header pagename="Dashboard" />
      <div className="flex w-full px-6 pt-2">
        <div className="w-full py-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="font-medium mr-8 text-base text-black">Dashboard</h1>
          </div>
          <div className="flex justify-between">
            <div className="w-[70%]">
              <div className="flex flex-col">
                <ul className="flex gap-4">
                  <li className="">
                    <Link
                      to={`${applinks.customers}/${applinks.addCustomer}`}
                      className="flex items-center w-full gap-2 border border-slate-300 rounded-md px-4 py-2 hover:border-indigo-600 hover:text-indigo-600 transition-all ease-in-out"
                    >
                      <CircleUser className="mr-1 w-5 h-5" />
                      <p className="font-medium text-xs">Add Customers</p>
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      to="/"
                      className="flex items-center w-full gap-2 border border-slate-300 rounded-md px-4 py-2 hover:border-indigo-600 hover:text-indigo-600 transition-all ease-in-out"
                    >
                      <CalendarFold className="mr-1 w-5 h-5" />
                      <p className="font-medium text-xs">Add Events</p>
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      to="/"
                      className="flex items-center w-full gap-2 border border-slate-300 rounded-md px-4 py-2 hover:border-indigo-600 hover:text-indigo-600 transition-all ease-in-out"
                    >
                      <Combine className="mr-1 w-5 h-5" />
                      <p className="font-medium text-xs">Add Collaborators</p>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <EventList />
          </div>
        </div>
      </div>
    </>
  );
};
