"use client";

import { ColumnDef } from "@tanstack/react-table";
import {  Images } from "@prisma/client";
import Image from "next/image";
import QuantityShopCart from "./quantity-shop-cart";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ShopCartColumn = {
  price: number;
  quantity: number;
  images: Images[];
  name: string
  totalPrice : any
};


export const Columns: ColumnDef<ShopCartColumn>[] = [
  {
    id: "name",
    header: "Product",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Image
          src={row.original.images[0].url}
          width={80}
          height={80}
          alt={row.original.name}
        />
        <h1>{row.original.name}</h1>
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    id: "quantity",
    header: "Quantity",
    cell: ({row}) => (
      <QuantityShopCart quantity={row.original.quantity} />
    ),
  },
  {
    id: "subtotal",
    header: "Subtotal",
    cell: ({row}) => (
      <h1>{row.original.totalPrice}</h1>
    )
  },
];
