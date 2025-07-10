import { Link } from "react-router-dom";
import moment from "moment";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown, Ellipsis, Eye, PenTool, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const billingColumns: ColumnDef<any>[] = [
  {
    accessorKey: "Name",
    header: ({ column }) => {
      return (
        <span
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Event Name
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </span>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <div className="capitalize font-semibold">
            {row.original.event.eventName}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => {
      return (
        <span
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Amount
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </span>
      );
    },
    cell: ({ row }) => <div>Rs. {row.original.event.totalAmount}/-</div>,
  },
  {
    accessorKey: "paidAmount",
    header: ({ column }) => {
      return (
        <span
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Paid Amount
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </span>
      );
    },
    cell: ({ row }) => <div>Rs. {row.getValue("paidAmount")}/-</div>,
  },
  {
    accessorKey: "pendingAmount",
    header: ({ column }) => {
      return (
        <span
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pending Amount
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </span>
      );
    },
    cell: ({ row }) => <div>Rs. {row.getValue("pendingAmount")}/-</div>,
  },
  {
    accessorKey: "paymentStatus",
    header: "Created",
    cell: ({ row }) => (
      <div className="capitalize font-semibold">
        {row.getValue("paymentStatus")}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <div className="capitalize font-semibold">
        {moment(row.getValue("createdAt")).format("ll")}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
        <div className="text-right font-medium">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <Ellipsis className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex items-center font-semibold text-xs">
                <Link
                  to={"/"}
                  className="flex items-center font-semibold text-xs"
                >
                  <Eye className="mr-2" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center font-semibold text-xs">
                <Link
                  to={"/"}
                  className="flex items-center font-semibold text-xs"
                >
                  <PenTool className="mr-2" />
                  Edit Information
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center font-semibold text-xs text-red-500 focus:text-red-500">
                <Trash2 />
                Delete Vendor
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
