"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type OrdersColumn = {
  id: string;
  date: string;
  total: string;
  status: string;
};

export const Columns = (): ColumnDef<OrdersColumn>[] => [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => (
      <p>#{row.original.id}</p>
    )
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
