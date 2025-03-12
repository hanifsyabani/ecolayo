"use client";

import { Category, Images, Product } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface ProductCardProps {
  product:
    | (Omit<Product, "price"> & {
        price: number; // Ganti Decimal jadi number
        images: Images[];
      })
    | null;
  categories: Category[] | null;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div  className="w-32 mt-4 h-32">
      {product?.images &&
      product?.images.length > 0 &&
      product?.images[0]?.url ? (
        <Image
          src={product.images[0].url}
          width={200}
          height={200}
          alt={product.name}
          className="w-full h-full bg-cover rounded-xl"
        />
      ) : (
        <div className="w-[200px] h-[200px] bg-gray-200 flex items-center justify-center">
          <span>No Image</span>
        </div>
      )}
      <div className="mt-2">
        <h1 className="text-sm font-extralight">{product?.name}</h1>
        <p className="text-sm">Rp.{product?.price}</p>
      </div>
    </div>
  );
}
