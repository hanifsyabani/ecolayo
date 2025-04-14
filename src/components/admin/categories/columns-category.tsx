"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActionCategory from "./cell-actions";
import Image from "next/image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoryColumn = {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: string;
};

export const Columns = (
  refetchCategories: () => void
): ColumnDef<CategoryColumn>[] => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "imageUrl",
    header: "Image",
    cell: ({ row }) => (
      <>
        {row.original.imageUrl ? (
          <Image
            src={row.original.imageUrl}
            width={80}
            height={80}
            alt={row.original.name}
          />
        ) : (
          <div>No image</div>
        )}
      </>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <CellActionCategory
        data={row.original}
        refetchCategories={refetchCategories}
      />
    ),
  },
];
