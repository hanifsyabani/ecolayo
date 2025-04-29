"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export type OrderProductColumn = {
  name: string;
  images: string;
  price: string;
  quantity: number;
  total: string;
};

export const Columns = (): ColumnDef<OrderProductColumn>[] => [
  {
    header: "Product",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Image src={row.original.images} width={50} height={50} alt={row.original.name}/>
        <h1>{row.original.name}</h1> 
      </div>
    )
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "total",
    header: "Subtotal",
  },
];
