"use client";

import ProductCard from "../products/product-card";
import TitleHome from "./title-home";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { GetProducts } from "@/service/products";

export default function ProductFeatured() {
  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryFn: () => GetProducts(),
    queryKey: ["dataProducts"],
  });

  const featuredProducts = products &&  products.filter(
    (product: any) => product.isFeatured
  );

  return (
    <div className="px-4 mt-20">
      <TitleHome title="Product Featured" link="/products/featured" />
      {featuredProducts?.length === 0 && (
        <h1 className="text-center flex justify-center items-center min-h-[100px] pt-32 ">
          No products found
        </h1>
      )}
      <div className="flex items-center justify-center gap-6 flex-wrap">
        {isLoadingProducts
          ? Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="w-52 h-44 rounded-xl" />
            ))
          : featuredProducts.map((product: any) => (
              <ProductCard product={product} key={product?.id} />
            ))}
      </div>
    </div>
  );
}
