"use client";

import React, { useEffect, useState } from "react";
import TitleHome from "./title-home";
import axios from "axios";
import { ProductProps } from "@/components/interface/product";
import ProductCard from "../products/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@prisma/client";

export default function NewestProduct() {
  const [newestProducts, setNewestProducts] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "/api/af990241-e9fd-458c-9612-47ea908df21f/products"
        );

        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const recentProducts = response.data.filter((product: Product) => {
          const productCreatedAt = new Date(product.createdAt);
          return productCreatedAt >= oneWeekAgo;
        });

        setNewestProducts(recentProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="mt-20 px-4">
      <TitleHome title="Newest Product" link="/products/newest" />

      <div className="flex items-center justify-center flex-wrap gap-4">
        {isLoading ? (
          Array.from({ length: newestProducts.length || 5 }).map((_, index) => (
            <Skeleton key={index} className="w-52 h-44 rounded-xl" />
          ))
        ) : newestProducts.length === 0 ? (
          <div className="flex justify-center items-center">
            <h1>No products found</h1>
          </div>
        ) : (
          newestProducts.map((product:any) => (
            <ProductCard product={product} key={product.id} />
          ))
        )}
      </div>
    </div>
  );
}
