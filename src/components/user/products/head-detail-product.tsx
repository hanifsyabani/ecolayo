"use client";

import {  addToCartAsync } from "@/app/redux/cart-slice";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Category, Images, Product, Tag } from "@prisma/client";
import { Heart, ShoppingCart } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaHeart, FaMinus, FaPlus, FaStar } from "react-icons/fa";
import Sosmed from "../sosmed";
import axios from "axios";
import { useParams } from "next/navigation";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useSession } from "next-auth/react";

interface ProductProps {
  setDialog?: (open: boolean) => void;
  product:
    | (Omit<Product, "price"> & {
        price: number;
        images: Images[];
        tag: Tag[];
        category: Category;
        isLike?: boolean;
      })
    | null;
}

export default function HeadDetailProduct({
  product,
  setDialog,
}: ProductProps) {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isLiked, setIsLiked] = useState(product?.isLike || false);
  const params = useParams();
  const { data: session } = useSession();

  const formatter = new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    style: "currency",
    currency: "IDR",
  });

  function incrementQuantity() {
    setQuantity((prev) => prev + 1);
  }
  function decrementQuantity() {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  }

  async function handleLiked() {
    try {
      setIsLoadingForm(true);
      await axios.patch(
        `/api/${params.storeid}/products/${product?.id}/liked-product`,
        {
          isLiked: !isLiked,
        }
      );

      setIsLiked((prev) => !prev);

      if (product) {
        product.isLike = !isLiked;
      }

      toast.success(isLiked ? "Product Unliked" : "Product Liked");
    } catch (error) {
      toast.error("Failed Liked Product");
    } finally {
      setIsLoadingForm(false);
    }
  }

  useEffect(() => {
    setIsLiked(product?.isLike || false);
  }, [product?.isLike]);

  async function handleAddtoCart() {
    if (!product?.stock) {
      toast.error("Product out of stock");
      return;
    }

    if (!session) return toast.error("Please login first");

    try {
      await dispatch(
        addToCartAsync({
          userId: session.user.id,
          productId: product.id,
          quantity,
        })
      ).unwrap();

      toast.success("Product added to cart");
    } catch (error) {
      toast.error("Error adding to cart");
    }
    if (setDialog) setDialog(false);

    toast.success("Product added to cart");
  }

  return (
    <>
      <div className="flex items-center gap-6 mt-2">
        <div className="flex items-center gap-2 ">
          <div className="flex items-center ">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                size={10}
                className={cn(
                  product?.stars && i < product.stars
                    ? "text-yellow-500"
                    : "text-gray-300"
                )}
              />
            ))}
          </div>
          <p className="text-xs text-gray-400">4 Reviews</p>
        </div>
        <p className="text-xs text-gray-400">Stock: {product?.stock || 0}</p>
      </div>

      <h1 className="text-xl text-secondary font-semibold py-4">
        {formatter.format(product?.price || 0)}
      </h1>

      <div className="flex justify-end">
        <Sosmed />
      </div>

      <p className="my-6 text-gray-500 text-sm">{product?.shortDescription}</p>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-8 shadow-md rounded-full w-32 px-2 ">
          <FaMinus
            size={20}
            className="bg-gray-100 rounded-full p-1 cursor-pointer"
            onClick={decrementQuantity}
          />
          {quantity}
          <FaPlus
            size={20}
            className="bg-gray-100 rounded-full p-1 cursor-pointer"
            onClick={incrementQuantity}
          />
        </div>

        <Button
          className="text-white text-sm rounded-full w-60"
          onClick={handleAddtoCart}
          disabled={!product?.stock}
        >
          <ShoppingCart /> Add to Cart
        </Button>

        <div
          className={`bg-gray-200 rounded-full p-2 cursor-pointer ${
            isLoadingForm && "cursor-not-allowed"
          }`}
          onClick={handleLiked}
        >
          {isLiked ? (
            <FaHeart size={20} className="text-primary" />
          ) : (
            <Heart size={20} className="text-primary" />
          )}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-sm">
          Category :{" "}
          <span className="text-gray-500"> {product?.category?.name}</span>
        </h3>
        <h3 className="text-sm flex gap-1 ">
          Tag :
          <span className="text-gray-500 flex gap-1 ">
            {product?.tag.map((tag) => (
              <p className="hover:underline cursor-pointer" key={tag.id}>
                {tag.name},
              </p>
            ))}
          </span>
        </h3>
      </div>
    </>
  );
}
