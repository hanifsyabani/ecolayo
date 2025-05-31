"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";

export type CheckoutColumn = {
  id: string;
  product: string;
  images: string;
  date: string;
  total: string;
  status: string;
};

export const Columns = (): ColumnDef<CheckoutColumn>[] => [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => <p>#{row.original.id}</p>,
  },
  {
    id: "product",
    header: "Product",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Image
          src={row.original.images}
          width={50}
          height={50}
          alt={row.original.product}
        />
        <h1>{row.original.product}</h1>
      </div>
    ),
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
        href={`/shop/dashboard/orders/${row.original.id}`}
        className="text-primary hover:underline "
      >
        View Details
      </Link>
    ),
  },
];
