"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActionCategory from "./cell-actions";


export type ProductColumn = {
  id: string;
  name: string;
  isFeatured: Boolean;
  isArchived: Boolean;
  price: string;
  category: string;
  createdAt: string;
  tag : string
};

export const Columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "tag",
    header: "Tags",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => <CellActionCategory data={row.original} />,
  },
];
