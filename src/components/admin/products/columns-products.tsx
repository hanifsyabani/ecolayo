"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-actions";
import Image from "next/image";
import { Eye } from "lucide-react";
import Link from "next/link";

export type ProductColumn = {
  id: string;
  name: string;
  isFeatured: Boolean;
  isArchived: Boolean;
  price: string;
  category: string;
  image: string;
  tag: string;
};

export const Columns = (
  refetchProducts: () => void
): ColumnDef<ProductColumn>[] => [
  {
    id: "detail",
    header: "Detail",
    cell: ({ row }) => (
      <Link href={`/admin/products/detail/${row.original.id}`}>
        <Eye className="bg-gray-400 hover:bg-gray-600 p-1 text-white rounded cursor-pointer" />
      </Link>
    ),
  },
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {row.original.image && (
          <Image
            src={row.original.image}
            width={50}
            height={50}
            alt={row.original.name}
            className="rounded"
          />
        )}
        <div className="font-medium">{row.original.name}</div>
      </div>
    ),
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
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <CellAction data={row.original} refetchProducts={refetchProducts} />
    ),
  },
];
