"use client";

import { DataTable } from "@/components/ui/data-table";
import { Columns, WishlistColumn } from "./column-wishlist";
import { useEffect, useState } from "react";
import axios from "axios";
import Sosmed from "../sosmed";

export default function TableWishlist() {
  const [wishlistProducts, setWishlistProducts] = useState<WishlistColumn[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "/api/af990241-e9fd-458c-9612-47ea908df21f/products/liked-product"
        );
        setWishlistProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if(isLoading) return <div className="spinner"></div>;

  return (
    <div className="px-8 mt-10">
      <DataTable data={wishlistProducts} columns={Columns} />
      <div className="pb-10">
        <Sosmed />
      </div>
    </div>
  );
}
