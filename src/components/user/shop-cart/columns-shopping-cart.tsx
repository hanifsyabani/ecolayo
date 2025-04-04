"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Images } from "@prisma/client";
import Image from "next/image";
import QuantityShopCart from "./quantity-shop-cart";
import RemoveFromCart from "./remove-from-cart";

// This type is used to define the shape of our data.
export type ShopCartColumn = {
  id: string;
  productId: string;
  price: number;
  quantity: number;
  images: Images[];
  name: string;
  totalPrice: string;
};

export const Columns = (
  onQuantityChange: (productId: string, quantity: number) => void
): ColumnDef<ShopCartColumn>[] => {
  return [
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
      cell: ({ row }) => (
        <>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(row.original.price)}
        </>
      ),
    },
    {
      id: "quantity",
      header: "Quantity",
      cell: ({ row }) => (
        <QuantityShopCart
          quantity={row.original.quantity}
          productId={row.original.productId}
          onQuantityChange={onQuantityChange}
        />
      ),
    },
    {
      id: "subtotal",
      header: "Subtotal",
      cell: ({ row }) => <h1>{row.original.totalPrice}</h1>,
    },
    {
      id: "delete",
      cell: ({ row }) => <RemoveFromCart itemid={row.original.id} />,
    },
  ];
};
