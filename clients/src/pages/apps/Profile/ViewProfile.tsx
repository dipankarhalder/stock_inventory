import { Link } from "react-router-dom";
import {
  ArrowLeft,
  KeyRound,
  Combine,
  CircleUser,
  CalendarFold,
  UserRoundPen,
  CircleFadingPlus,
} from "lucide-react";
import { applinks } from "@/router/links";
import { useProfileStore } from "@/store/profileStore";

function getInitials(name: string) {
  const words = name.split(" ");
  const initials = words.map((word) => word.charAt(0).toUpperCase()).join("");
  return initials;
}

export const ViewProfile = () => {
  const { profile } = useProfileStore();

  return (
    <div className="w-full py-4">
      <div className="flex justify-between items-center px-[22rem] w-full mb-6">
        <h1 className="font-medium mr-8 text-base text-black">
          <Link to={applinks.dashboard} className="flex items-center">
            <ArrowLeft className="mr-5 w-5 h-5" /> My Profile
          </Link>
        </h1>
      </div>
      <div className="flex flex-col items-center pb-4 px-[22rem] w-full">
        {profile && (
          <div className="flex flex-col border border-slate-300 mb-10 w-full rounded-md overflow-hidden">
            <div className="flex justify-between items-start py-5 px-6">
              <div className="flex gap-6">
                <div>
                  <span className="flex w-[80px] h-[80px] bg-blue-200 text-blue-800 items-center justify-center text-2xl font-bold rounded-full">
                    {getInitials(profile.name)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <h1 className="font-semibold text-base text-black mb-3">
                    {profile.name}
                  </h1>
                  <p className="text-xs font-normal mb-1">
                    Email: <span className="text-sm ml-2">{profile.email}</span>
                  </p>
                  <p className="text-xs font-normal">
                    Phone: <span className="text-sm ml-2">{profile.phone}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col bg-slate-100 py-4 px-6">
              <div className="flex mb-3">
                <div className="w-[103px]">
                  <h6 className="text-sm font-medium mb-1">Role:</h6>
                </div>
                <div>
                  <p className="text-xs font-medium mb-1 capitalize">
                    {profile.role === "super_admin"
                      ? "Super Admin"
                      : profile.role}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-[103px]">
                  <h6 className="text-sm font-medium mb-1">Address:</h6>
                </div>
                {profile.address ? (
                  <div>
                    <p className="text-xs font-medium mb-1">
                      {profile.address.landmark}, {profile.address.area},{" "}
                      {profile.address.city},
                    </p>
                    <p className="text-xs font-medium">
                      {profile.address.state} - {profile.address.pincode}.
                    </p>
                  </div>
                ) : (
                  <span className="flex px-2 py-2 items-center text-indigo-700 font-medium text-xs rounded-md cursor-pointer bg-indigo-200 hover:text-white hover:bg-indigo-600 transition-all ease-in-out">
                    <CircleFadingPlus className="mr-2 w-4 h-4" /> Add Address
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="w-full">
          <div className="flex flex-col mb-8">
            <p className="text-xs mb-2 font-medium text-slate-500">
              Profile links
            </p>
            <ul className="flex gap-4">
              <li className="">
                <Link
                  to={applinks.editUser}
                  className="flex items-center w-full gap-2 border border-slate-300 rounded-md px-4 py-2 hover:border-indigo-600 hover:text-indigo-600 transition-all ease-in-out"
                >
                  <UserRoundPen className="mr-1 w-5 h-5" />
                  <p className="font-medium text-xs">Update Profile</p>
                </Link>
              </li>
              <li className="">
                <Link
                  to="/"
                  className="flex items-center w-full gap-2 border border-slate-300 rounded-md px-4 py-2 hover:border-indigo-600 hover:text-indigo-600 transition-all ease-in-out"
                >
                  <KeyRound className="mr-1 w-5 h-5" />
                  <p className="font-medium text-xs">Change Password</p>
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <p className="text-xs mb-2 font-medium text-slate-500">
              Important links
            </p>
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
      </div>
    </div>
  );
};
