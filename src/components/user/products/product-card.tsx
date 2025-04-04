"use client";

import { Category, Images, Product, Tag } from "@prisma/client";
import { Expand, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import PreviewProduct from "./dialog-preview-product";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { addToCartAsync } from "@/app/redux/cart-slice";
import { useAppDispatch } from "@/hooks/use-app-dispatch";

interface ProductCardProps {
  product:
    | (Omit<Product, "price"> & {
        price: number;
        images: Images[];
        tag: Tag[];
        category: Category;
      })
    | null;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const { data: session } = useSession();

  const formatter = new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    style: "currency",
    currency: "IDR",
  });

  async function handleAddtoCart() {
    if (!product) {
      toast.error("Product not found");
      return;
    }

    if (!product.stock) {
      toast.error("Product out of stock");
      return; 
    }

    if (!session || !session.user?.id) {
      toast.error("Please login first");
      return;
    }

    setIsLoading(true);
    try {
      await dispatch(
        addToCartAsync({
          productId: product.id,
          quantity: 1,
        })
      ).unwrap();

      toast.success("Product added to cart");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error adding to cart");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="w-52 mt-4 rounded-xl hover:shadow-xl border-b-2 border-b-white cursor-pointer hover:border-b-primary p-3">
        <div className="w-full relative h-44 group bg-gray-100 flex items-center justify-center">
          {product?.images && 
           product.images.length > 0 && 
           product.images[0]?.url ? (
            <Image
              src={product.images[0].url}
              width={200}
              height={200}
              alt={product?.name || "Product image"}
              className="w-full h-full rounded-xl object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span>No Image</span>
            </div>
          )}
          <div
            className="group-hover:opacity-100 opacity-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 transition-all z-20"
            onClick={(e) => {
              e.stopPropagation();
              setOpenDialog(true);
            }}
          >
            <Expand className="text-white" />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Link href={`/user/product/${product?.id}`}>
            <div className="mt-2 space-y-1">
              <h1 className="text-sm font-extralight">{product?.name}</h1>
              <p className="text-sm">{formatter.format(product?.price || 0)}</p>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <FaStar
                    key={index}
                    size={10}
                    className={
                      index < (product?.stars || 0)
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
            </div>
          </Link>
          <button
            disabled={isLoading}
            onClick={handleAddtoCart}
            className="disabled:opacity-50"
          >
            <ShoppingCart
              size={25}
              className={`hover:bg-primary p-1 hover:text-white hover:rounded-full cursor-pointer ${isLoading ? 'opacity-50' : ''}`}
            />
          </button>
        </div>
      </div>

      <PreviewProduct
        open={openDialog}
        setOpenDialog={setOpenDialog}
        product={product}
      />
    </>
  );
}