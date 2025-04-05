"use client";

import { ColumnDef } from "@tanstack/react-table";
import Action from "./action";
import { Images} from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export type WishlistColumn = {
  id: string;
  name:string,
  images: Images[]
  stock: number;
  price: number;
}

export const Columns = (onRefresh: () => void): ColumnDef<WishlistColumn>[] => [
  {
    accessorKey: "name",
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
    header: "Price",
    cell : ({row}) => (
      <div>
        {new Intl.NumberFormat('id-ID', {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(row.original.price)}
      </div>
    )
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
    cell: ({ row }) => <Action product={row.original} onRefresh={onRefresh} />,
  },
];

