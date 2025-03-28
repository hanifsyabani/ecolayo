"use client";

import { Product } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../products/product-card";
import TitleHome from "./title-home";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductListProps {
  title: string;
}

export default function ProductFeatured({ title }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(
          "/api/af990241-e9fd-458c-9612-47ea908df21f/products"
        );
        const featuredProducts = response.data.filter(
          (product) => product.isFeatured
        );
        setProducts(featuredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="px-4 mt-20">
      <TitleHome title={title} link="/products/featured" />
      <div className="flex items-center justify-center flex-wrap">
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="w-52 h-44 rounded-xl" />
            ))
          : products.map((product: any) => (
              <ProductCard product={product} key={product?.id} />
            ))}
      </div>
    </div>
  );
}
