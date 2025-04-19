"use client";

import TitleHome from "./title-home";
import ProductCard from "../products/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { GetProducts } from "@/service/products";
import { useQuery } from "@tanstack/react-query";

export default function NewestProduct() {
  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryFn: () => GetProducts(),
    queryKey: ["dataProducts"],
  });

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const newestProducts = products && products.filter((product: any) => {
    const productCreatedAt = new Date(product.createdAt);
    return productCreatedAt >= oneWeekAgo;
  });

  return (
    <div className="mt-20 px-4">
      <TitleHome title="Newest Product" link="/products/newest" />

      <div className="flex items-center justify-center flex-wrap gap-4">
        {isLoadingProducts ? (
          Array.from({ length: newestProducts && newestProducts.length || 5 }).map((_, index) => (
            <Skeleton key={index} className="w-52 h-44 rounded-xl" />
          ))
        ) : newestProducts.length === 0 ? (
          <div className="flex justify-center items-center">
            <h1>No products found</h1>  
          </div>
        ) : (
          newestProducts.map((product: any) => (
            <ProductCard product={product} key={product.id} />
          ))
        )}
      </div>
    </div>
  );
}
