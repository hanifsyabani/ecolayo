"use client"

import { ColumnDef } from "@tanstack/react-table"
import Action from "./action"
import { Category, Images, Product, Tag } from "@prisma/client";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type WishlistColumn = Omit<Product, "price"> & {
  price: number;
  images: Images[];
  tag: Tag[];
  category: Category;
};

export const Columns: ColumnDef<WishlistColumn>[] = [
  {
    accessorKey: "name",
    header: "Product",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    id: "actions",
    cell: ({row}) => <Action product={row.original}/>,
  },
]
