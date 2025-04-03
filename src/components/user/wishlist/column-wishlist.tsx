"use client";

import { ColumnDef } from "@tanstack/react-table";
import Action from "./action";
import { Category, Images, Product, Tag } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

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
    header: "Stock",
    cell: ({ row }) => (
      <div>
        {row.original.stock ? (
          <Badge className="bg-green-600 text-white cursor-pointer">
            In Stock ({row.original.stock})
          </Badge>
        ) : (
          <Badge className="bg-red-600 text-white hover:bg-red-900 cursor-pointer">
            Out of Stock
          </Badge>
        )}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <Action product={row.original} />,
  },
];
