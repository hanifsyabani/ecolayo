"use client";

import { ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import { WishlistColumn } from "./column-wishlist";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { addToCartAsync } from "@/app/redux/cart-slice";
import { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { PatchLikedProduct } from "@/service/shop/products";

interface ActionProps {
  product: WishlistColumn;
  refetch: () => void;
}

export default function Action({ product, refetch }: ActionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [openDialog, setOpenDialog] = useState(false);

  async function handleAddToCart() {
    if (!product.stock) return toast.error("Product out of stock");

    setIsLoading(true);
    try {
      await dispatch(
        addToCartAsync({
          productId: product.id,
          quantity: 1,
        })
      );

      toast.success("Product added to cart");
    } catch (error) {
      toast.error("Error adding to cart");
    } finally {
      setIsLoading(false);
    }
  }

  // async function handleRemoveItem() {
  //   setIsLoading(true);
  //   try {
  //     await axios.patch(
  //       `/api/af990241-e9fd-458c-9612-47ea908df21f/products/${product.id}/liked-product`,
  //       {
  //         isLiked: false,
  //       }
  //     );

  //     setOpenDialog(false);
  //     toast.success("Product removed from wishlist");
  //     onRefresh();
  //   } catch (error) {
  //     toast.error("Failed to remove product from wishlist");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  const {mutate: removeFromWishlist} = useMutation({
    mutationFn: () => PatchLikedProduct(product.id, false),
    onSuccess: () => {
      setIsLoading(false);
      setOpenDialog(false);
      toast.success("Product removed from wishlist");
      refetch();
    },
    onError: (error: any) => {
      setIsLoading(false);
      const message = error?.error || error?.message || "Cannot like product";
      toast.error(message);
    },
  });

  async function handleRemoveItem() {
    setIsLoading(true);
    removeFromWishlist();
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <Button
          className={`${
            isLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer"
          } text-white text-sm rounded-full`}
          onClick={handleAddToCart}
          disabled={isLoading || !product.stock}
        >
          <ShoppingCart />
          <h1 className="lg:block hidden">Add to Cart</h1>
        </Button>
        <Button
          className="text-white bg-gray-500 hover:bg-gray-900"
          onClick={() => setOpenDialog(true)}
        >
          <X />
        </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Just Checking!</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this product from your wishlist?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setOpenDialog(false)} variant={"outline"}>
              Cancel
            </Button>
            <Button
              onClick={handleRemoveItem}
              className="text-white bg-red-500 hover:bg-red-900"
              disabled={isLoading}
            >
              {isLoading ? <p className="spinner" /> : "Remove"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
