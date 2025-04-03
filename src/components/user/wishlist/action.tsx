"use client";

import { ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import { WishlistColumn } from "./column-wishlist";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { addToCartAsync } from "@/app/redux/cart-slice";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface ActionProps {
  product: WishlistColumn;
}

export default function Action({ product }: ActionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  async function handleAddToCart() {
    if (!product.stock) return toast.error("Product out of stock");

    if (!session) return toast.error("Please login first");
    try {
      setIsLoading(true);
      await dispatch(
        addToCartAsync({
          productId: product.id,
          quantity: 1,
          userId: session?.user.id,
        })
      );

      toast.success("Product added to cart");
    } catch (error) {
      toast.error("Error adding to cart");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-4">
      <Button
        className={`${
          isLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer"
        } text-white text-sm rounded-full`}
        onClick={handleAddToCart}
        disabled={isLoading}
      >
        <ShoppingCart /> Add to Cart
      </Button>
      <Button className="text-white bg-gray-500">
        <X />
      </Button>
    </div>
  );
}
