"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { Check, Clock, Truck, X } from "lucide-react";
import Link from "next/link";

export type OrdersColumn = {
  id: string;
  customer?: string;
  date: string;
  total: string;
  status: string;
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "processing":
      return (
        <Badge className="bg-blue-500 hover:bg-blue-600">
          <Clock className="h-3 w-3 mr-1" /> Processing
        </Badge>
      );
    case "on-the-way":
      return (
        <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">
          <Truck className="h-3 w-3 mr-1" /> On The Way
        </Badge>
      );
    case "delivered":
      return (
        <Badge className="bg-green-500 hover:bg-green-600 text-white">
          <Check className="h-3 w-3 mr-1" /> Delivered
        </Badge>
      );
    case "cancelled":
      return (
        <Badge className="bg-red-500 hover:bg-red-600 text-white">
          <X className="h-3 w-3 mr-1" /> Cancelled
        </Badge>
      );
    default:
      return <Badge className="bg-gray-500 hover:bg-gray-600 text-white">{status}</Badge>;
  }
};

export const Columns = (): ColumnDef<OrdersColumn>[] => [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => <p>#{row.original.id}</p>,
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => getStatusBadge(row.original.status),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Link
        href={`/admin/orders/${row.original.id}`}
        className="text-primary hover:underline "
      >
        View Details
      </Link>
    ),
  },
];
