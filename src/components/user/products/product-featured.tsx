"use client";

import { Product } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./product-card";

interface ProductListProps {
  title: string;
}

export default function ProductFeatured({ title }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);

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
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="px-4 mt-10">
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="flex items-center justify-center flex-wrap gap-20">
        {products.map((product: any) => (
          <ProductCard product={product} categories={null} key={product?.id} />
        ))}
      </div>
    </div>
  );
}
