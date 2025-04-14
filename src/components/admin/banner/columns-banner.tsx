"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-actions";
import Image from "next/image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BannerColumn = {
  id: string;
  label: string;
  imageUrl: string;
  categoryBanner: string;
  createdAt: string;
};

export const Columns = (
  refetchBanners: () => void
): ColumnDef<BannerColumn>[] => [
  {
    id: "label",
    header: "Banner",
    cell: ({ row }) => (
      <>
        <div className="flex items-center gap-2">
          {row.original.imageUrl && (
            <Image
              src={row.original.imageUrl}
              width={100}
              height={100}
              alt={row.original.label}
              className="rounded"
            />
          )}
          <div className="font-medium">{row.original.label}</div>
        </div>
      </>
    ),
  },
  {
    accessorKey: "categoryBanner",
    header: "Category Banner",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <CellAction data={row.original} refetchBanners={refetchBanners} />
    ),
  },
];
