"use client";

import { Category, Images, Product } from "@prisma/client";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";

interface ProductCardProps {
  product:
    | (Omit<Product, "price"> & {
        price: number;
        images: Images[];
      })
    | null;
  categories: Category[] | null;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="w-52 mt-4  rounded-xl hover:shadow-xl border-b-2 border-b-white cursor-pointer hover:border-b-primary overflow-hidden p-3">
      <div className="w-full h-44 bg-gray-100 flex items-center justify-center">
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
      </div>
      <div className="flex justify-between items-center ">
        <div className="mt-2 space-y-1">
          <h1 className="text-sm font-extralight">{product?.name}</h1>
          <p className="text-sm">Rp.{product?.price}</p>
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
        <ShoppingCart
          size={25}
          className="hover:bg-primary p-1 hover:text-white hover:rounded-full cursor-pointer"
        />
      </div>
    </div>
  );
}
