import { Link } from "react-router-dom";
import moment from "moment";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown, Eye, PenLine, SquareArrowOutUpRight } from "lucide-react";
import { IVendorInfo } from "@/interface";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

function getInitials(name: string) {
  const words = name.split(" ");
  const initials = words.map((word) => word.charAt(0).toUpperCase()).join("");
  return initials;
}

export const vendorsColumns: ColumnDef<IVendorInfo>[] = [
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
      return (
        <div className="flex items-center">
          <Avatar className="mr-3">
            <AvatarFallback className={`font-semibold text-xs text-black bg-gray-100`}>{initials}</AvatarFallback>
          </Avatar>
          <div className="capitalize font-semibold">
            <Link to={`view`} className="underline text-blue-700 flex items-center gap-2">
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
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <span
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </span>
      );
    },
    cell: ({ row }) => (
      <div className="flex">
        {row.getValue("role") === "super_admin" ? (
          <div className="capitalize text-xs font-semibold bg-green-200 text-green-900 py-1 px-2 rounded-md">
            {row.getValue("role")}
          </div>
        ) : row.getValue("role") === "collaborator" ? (
          <div className="capitalize text-xs font-semibold bg-blue-200 text-blue-900 py-1 px-2 rounded-md">
            {row.getValue("role")}
          </div>
        ) : (
          <div className="capitalize text-xs font-semibold bg-amber-200 text-amber-900 py-1 px-2 rounded-md">
            {row.getValue("role")}
          </div>
        )}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => <div className="capitalize font-semibold">{moment(row.getValue("createdAt")).format("ll")}</div>,
  },
  {
    accessorKey: "actions",
    header: "Action",
    cell: () => {
      return (
        <div className="font-medium">
          <div className="font-medium flex justify-center items-center w-auto">
            <Link
              to={"/"}
              className="flex items-center font-semibold text-xs mr-3 px-2 py-1 bg-gray-200 text-gray-800 rounded-md"
            >
              <Eye className="w-[16px] h-[16px] mr-1" />
              <p className="text-[12px]">View</p>
            </Link>
            <Link
              to={"/"}
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
