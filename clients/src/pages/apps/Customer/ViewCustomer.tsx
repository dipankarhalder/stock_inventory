import { useEffect, useState } from "react";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Trash2, PenLine } from "lucide-react";
import { applinks } from "@/router/links";
import { useConsumerStore } from "@/store/consumerStore";
// import { useEventStore } from "@/store/eventStore";
import { getEvent } from "@/services/event.services";
import { sharedData } from "@/components/sharedData";

const getRandomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * sharedData.length);
  return sharedData[randomIndex].imgUrl;
};

export const ViewCustomer = () => {
  const [proEvent, setProEvent] = useState<any>();
  const params = useParams();
  const { listConsumer, setDeleteTogglePopup, setDeleteConsumer } = useConsumerStore();
  // const { listEvents } = useEventStore();

  const foundUser = listConsumer && listConsumer.find((u: any) => u._id === params.id);
  const randomAvatarUrl = getRandomAvatar();

  useEffect(() => {
    if (foundUser) {
      getEvent(foundUser._id).then((res) => setProEvent(res));
    }
  }, [foundUser]);

  return (
    <div className="flex flex-col items-center py-4 px-[16rem] w-full">
      <div className="flex justify-between items-center w-full mb-6">
        <h1 className="font-medium mr-8 text-base text-black">
          <Link to={applinks.customers} className="flex items-center">
            <ArrowLeft className="mr-5 w-5 h-5" /> Consumer Details
          </Link>
        </h1>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-col border border-slate-300 mb-4 w-full rounded-md overflow-hidden">
          <div className="flex justify-between items-start py-5 px-6">
            <div className="flex gap-6">
              <div>
                <span className="flex w-[80px] h-[80px] bg-blue-200 text-blue-800 items-center justify-center text-2xl font-bold rounded-md">
                  <img src={randomAvatarUrl} alt={foundUser?.name} />
                </span>
              </div>
              <div className="flex flex-col">
                <h1 className="font-semibold text-base text-black mb-3">{foundUser?.name}</h1>
                <p className="text-xs font-normal mb-1">
                  Email: <span className="text-sm font-semibold ml-2">{foundUser?.email}</span>
                </p>
                <p className="text-xs font-normal">
                  Phone: <span className="text-sm font-semibold ml-2">{foundUser?.phone}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex bg-slate-100 py-4 px-6">
            <div className="w-[103px]">
              <h6 className="text-sm font-medium mb-1">Address:</h6>
            </div>
            <div>
              <p className="text-xs font-medium leading-[20px]">
                {foundUser?.address.area}, {foundUser?.address.landmark}, {foundUser?.address.city},
                {foundUser?.address.state} - {foundUser?.address.pincode}.
              </p>
            </div>
          </div>
        </div>
        <div className="flex mb-10">
          <ul className="flex gap-4">
            <li className="">
              <Link
                to={`update`}
                className="flex items-center w-full gap-2 bg-slate-200 rounded-md px-4 py-2 hover:bg-indigo-600 hover:text-white transition-all ease-in-out"
              >
                <PenLine className="w-4 h-4" />
                <p className="font-semibold text-xs">Update</p>
              </Link>
            </li>
            <li className="">
              <span
                onClick={() => {
                  setDeleteConsumer(foundUser._id);
                  setDeleteTogglePopup(true);
                }}
                className="flex items-center w-full gap-2 bg-slate-200 rounded-md px-4 py-2 hover:bg-red-600 hover:text-white transition-all ease-in-out cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <p className="font-semibold text-xs">Delete</p>
              </span>
            </li>
          </ul>
        </div>
        <p className="text-xs mb-2 font-medium text-slate-500">List of events information</p>
        <div className="flex">
          <div className="flex flex-col w-full">
            {proEvent && proEvent.event.length ? (
              proEvent.event.map((item: any) => (
                <div
                  key={item._id}
                  className="flex flex-col border border-slate-200 mb-3 w-full rounded-md py-3.5 px-4 relative"
                >
                  <h6 className="text-sm font-bold mb-3">{item.eventName}</h6>
                  <div className="absolute right-3.5 bottom-4">
                    <Link
                      to={`/${params.id}/${item._id}`}
                      className="font-medium text-xs px-2 py-1 bg-blue-200 rounded-md text-blue-600 cursor-pointer hover:text-white hover:bg-blue-600 ease-in-out transition"
                    >
                      More Details
                    </Link>
                  </div>
                  <p className="flex items-center mb-1">
                    <span className="text-xs font-normal w-10">Date:</span>{" "}
                    <span className="text-xs font-bold mr-3">{moment(item.createdAt).format("LLL")}</span>{" "}
                    {/* <span className="text-xs font-medium text-red-600 bg-red-100 px-1.5 py-1 rounded-md">
                      ({item.status})
                    </span> */}
                  </p>
                  <p className="flex items-center mb-1">
                    <span className="text-xs font-normal w-10">Cost:</span>{" "}
                    <span className="text-xs font-bold mr-3">Rs. {item.totalAmount}/-</span>
                  </p>
                </div>
              ))
            ) : (
              <div className="flex flex-col border border-slate-300 mb-10 w-full rounded-md overflow-hidden py-8 px-6">
                <p className="text-xs font-medium text-slate-500">Data is not available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
