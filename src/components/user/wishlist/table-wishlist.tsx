"use client";

import { DataTable } from "@/components/ui/data-table";
import { Columns, WishlistColumn } from "./column-wishlist";
import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "@prisma/client";
import Sosmed from "../sosmed";

export default function TableWishlist() {
  const [wishlistProducts, setWishlistProducts] = useState<WishlistColumn[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(
          "/api/af990241-e9fd-458c-9612-47ea908df21f/products"
        );
        const wishlistProducts: any = response.data.filter(
          (product) => product.isLike
        );
        setWishlistProducts(wishlistProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="px-8 mt-10">
      <DataTable data={wishlistProducts} columns={Columns} />
      <div className="pb-10">
        <Sosmed />
      </div>
    </div>
  );
}
