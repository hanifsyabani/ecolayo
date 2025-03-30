"use client";

import { ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/redux/cart-slice";

import { WishlistColumn } from "./column-wishlist";
import toast from "react-hot-toast";

interface ActionProps {
  product: WishlistColumn;
}

export default function Action({ product }: ActionProps) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-4">
      <Button
        className="text-white text-sm rounded-full"
        onClick={() => {
          product &&
            dispatch(
              addToCart({
                ...product,
                quantity: 1,
              })
            );
            toast.success("Product added to cart")
        }}
      >
        <ShoppingCart /> Add to Cart
      </Button>
      <Button className="text-white bg-gray-500">
        <X />
      </Button>
    </div>
  );
}
