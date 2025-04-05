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

  useEffect(() => {
    fetchProducts();
  }, []);

  const formattedProduct: WishlistColumn[] = wishlistProducts.map(
    (product) => ({
      id: product.id,
      name: product.name,
      images: product.images,
      price: product.price,
      stock: product.stock,
    })
  );

  if (isLoading) return <div className="spinner"></div>;

  return (
    <div className="px-8 mt-10">
      <DataTable data={formattedProduct} columns={Columns(fetchProducts)} />
      <div className="pb-10">
        <Sosmed />
      </div>
    </div>
  );
}
