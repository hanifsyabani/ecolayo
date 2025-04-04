"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Images } from "@prisma/client";
import Image from "next/image";
import QuantityShopCart from "./quantity-shop-cart";
import { X } from "lucide-react";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { updateCartAsync } from "@/app/redux/cart-slice";
import toast from "react-hot-toast";

// This type is used to define the shape of our data.
export type ShopCartColumn = {
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
  const dispatch = useAppDispatch();

  const handleRemoveItem = async (productId: string) => {
    try {
      await dispatch(
        updateCartAsync({
          productId,
          quantity: 0,
        })
      ).unwrap();
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error removing item"
      );
    }
  };

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
      cell: ({ row }) => (
        <X
          size={25}
          className="bg-gray-200 rounded-full p-1 cursor-pointer"
          onClick={() => handleRemoveItem(row.original.productId)}
        />
      ),
    },
  ];
};
