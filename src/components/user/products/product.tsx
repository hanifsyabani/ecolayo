"use client";

import React from "react";
import HeadDetailProduct from "./head-detail-product";
import BottomDetailsProduct from "./bottom-details-product";
import { useQuery } from "@tanstack/react-query";
import { GetProductById } from "@/service/products";
import Image from "next/image";

interface ProductProps {
  id: string;
}

export default function Product({ id }: ProductProps) {
  const { data: product, isLoading: isLoadingProduct } = useQuery({
    queryFn: () => GetProductById(id),
    queryKey: ["dataProduct"],
  });

  if (isLoadingProduct) return <div className="spinner"></div>;
  return (
    <>
      <div className="flex justify-center gap-4 px-4">
        <div className="w-1/2 h-full flex justify-center items-center">
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
        <div>
          <h1 className="text-2xl font-semibold">{product?.name}</h1>

          <HeadDetailProduct product={product} />
        </div>
      </div>
      <BottomDetailsProduct product={product} />
    </>
  );
}
