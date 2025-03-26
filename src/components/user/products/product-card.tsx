"use client";

import { Category, Images, Product, Tag } from "@prisma/client";
import { Expand, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import PreviewProduct from "./dialog-preview-product";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/redux/cart-slice";
import toast from "react-hot-toast";

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
  const dispatch = useDispatch();

  const formatter = new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    style: "currency",
    currency: "IDR",
  });

  return (
    <>
      <div className="w-52 mt-4  rounded-xl hover:shadow-xl border-b-2 border-b-white cursor-pointer hover:border-b-primary overflow-hidden p-3">
        <div className="w-full relative h-44 group bg-gray-100 flex items-center justify-center">
          {product?.images &&
          product?.images.length > 0 &&
          product?.images[0]?.url ? (
            <Image
              src={product.images[0].url}
              width={200}
              height={200}
              alt={product.name}
              className="w-full h-full rounded-xl"
            />
          ) : (
            <div className="w-[200px] h-[200px] bg-gray-200 flex items-center justify-center">
              <span>No Image</span>
            </div>
          )}
          <div
            className="group-hover:opacity-100 opacity-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 transition-all z-20 "
            onClick={(e) => {
              e.stopPropagation();
              setOpenDialog(true);
            }}
          >
            <Expand className="text-white" />
          </div>
        </div>
        <div className="flex justify-between items-center ">
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
          <ShoppingCart
            size={25}
            onClick={() => {
              product && dispatch(addToCart({
                ...product,
                quantity:1
              }))
              toast.success("Product added to cart");
            }}
            className="hover:bg-primary p-1 hover:text-white hover:rounded-full cursor-pointer"
          />
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
