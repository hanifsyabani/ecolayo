"use client";

import { DataTable } from "@/components/ui/data-table";
import { Columns, WishlistColumn } from "./column-wishlist";

import Sosmed from "../sosmed";
import { useQuery } from "@tanstack/react-query";
import { GetLikedProducts } from "@/service/shop/products";

export default function TableWishlist() {
  const {
    data: likedProducts,
    isLoading: isLoadingLiked,
    refetch,
  } = useQuery({
    queryFn: () => GetLikedProducts(),
    queryKey: ["listLikedProducts"],
  });

  const formattedProduct: WishlistColumn[] = likedProducts?.map(
    (likedProduct: any) => {
      const product = likedProduct.product;
      return {
        id: product.id,
        name: product.name,
        images: product.images[0].url,
        price: product.price,
        stock: product.stock,
      };
    }
  );

  if (formattedProduct?.length === 0)
    return <div className="text-center mt-10">Wishlist is empty</div>;

  if (isLoadingLiked) return <div className="spinner"></div>;

  return (
    <div className="px-8 mt-10">
      <DataTable data={formattedProduct} columns={Columns(refetch)} />
      <div className="pb-10">
        <Sosmed />
      </div>
    </div>
  );
}
