import { Link } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown, Eye, SquareArrowOutUpRight, PenLine } from "lucide-react";
import { IUserInfo } from "@/interface";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { sharedData } from "@/components/sharedData";

function getInitials(name: string) {
  const words = name.split(" ");
  const initials = words.map((word) => word.charAt(0).toUpperCase()).join("");
  return initials;
}

const getRandomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * sharedData.length);
  return sharedData[randomIndex].imgUrl;
};

export const customerColumns: ColumnDef<IUserInfo>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <span
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </span>
      );
    },
    cell: ({ row }) => {
      const initials = getInitials(row.getValue("name"));
      const randomAvatarUrl = getRandomAvatar();
      return (
        <div className="flex items-center">
          <Avatar className="mr-3">
            <AvatarImage src={randomAvatarUrl} alt={initials} />
            <AvatarFallback className={`font-semibold text-xs text-black bg-gray-100`}>{initials}</AvatarFallback>
          </Avatar>
          <div className="capitalize font-semibold">
            <Link to={row.original._id} className="underline text-blue-800 flex items-center gap-2">
              {row.getValue("name")}
              <SquareArrowOutUpRight size={14} />
            </Link>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <span
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </span>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: "Phone no.",
    cell: ({ row }) => <div className="capitalize font-semibold">{row.getValue("phone")}</div>,
  },
  {
    header: "Address",
    cell: ({ row }) => (
      <div className="capitalize font-semibold">
        {row.original.address.area}, {row.original.address.landmark} - &nbsp;
        {row.original.address.pincode}
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: "Action",
    cell: ({ row }) => {
      const customerId = row.original._id;
      return (
        <div className="text-right font-medium">
          <div className="font-medium flex justify-start items-center w-auto">
            <Link
              to={customerId}
              className="flex items-center font-semibold text-xs mr-3 px-2 py-1 bg-gray-200 text-gray-800 rounded-md"
            >
              <Eye className="w-[16px] h-[16px] mr-1" />
              <p className="text-[12px]">View</p>
            </Link>
            <Link
              to={`${customerId}/update`}
              className="flex items-center font-semibold text-xs mr-3 px-2 py-1 bg-blue-200 text-blue-800 rounded-md"
            >
              <PenLine className="w-[16px] h-[16px] mr-1" />
              <p className="text-[12px]">Edit</p>
            </Link>
          </div>
        </div>
      );
    },
  },
];
