"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GetCategories } from "@/service/categories";
import { GetProducts } from "@/service/products";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../products/product-card";
import { useState } from "react";
import Newsletter from "../newsletter";

const priceFilter = [
  {
    value: "asc",
    label: "Price: Low to High",
  },
  {
    value: "desc",
    label: "Price: High to Low",
  },
];

export default function AllProductsView() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [limit, setLimit] = useState(10);

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryFn: () => GetCategories(),
    queryKey: ["dataCategories"],
  });

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryFn: () => GetProducts(),
    queryKey: ["dataAllProducts"],
  });

  const filteredProducts = products
    ?.filter((product: any) => {
      if (
        selectedCategory !== "all" &&
        product.category.name !== selectedCategory
      ) {
        return false;
      }
      if (
        selectedRating !== "all" &&
        Math.floor(product.rating) !== Number(selectedRating)
      ) {
        return false;
      }
      return true;
    })
    ?.sort((a: any, b: any) => {
      if (selectedPrice === "asc") return a.price - b.price;
      if (selectedPrice === "desc") return b.price - a.price;

      if (sortBy === "latest")
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      if (sortBy === "oldest")
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );

      return 0;
    })
    ?.slice(0, limit);


  if (isLoadingCategories || isLoadingProducts)
    return <div className="spinner" />;

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Select onValueChange={(value) => setSelectedCategory(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem
                value="all"
                className="hover:bg-gray-200 cursor-pointer"
              >
                All Category
              </SelectItem>
              {categories.map((category: any) => (
                <SelectItem
                  value={category.name}
                  key={category.id}
                  className="hover:bg-gray-200 cursor-pointer"
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setSelectedPrice(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Price" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem
                value="all"
                className="hover:bg-gray-200 cursor-pointer"
              >
                All Price
              </SelectItem>
              {priceFilter.map((price: any) => (
                <SelectItem
                  value={price.value}
                  key={price.value}
                  className="hover:bg-gray-200 cursor-pointer"
                >
                  {price.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setSelectedRating(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Rating" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem
                value="all"
                className="hover:bg-gray-200 cursor-pointer"
              >
                All Rating
              </SelectItem>
              {Array.from({ length: 5 }).map((_, index) => (
                <SelectItem
                  value={String(index + 1)}
                  key={index}
                  className="hover:bg-gray-200 cursor-pointer"
                >
                  {index + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-4">
          <Select onValueChange={(value) => setSortBy(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by " />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem
                value="latest"
                className="hover:bg-gray-200 cursor-pointer"
              >
                Latest
              </SelectItem>
              <SelectItem
                value="oldest"
                className="hover:bg-gray-200 cursor-pointer"
              >
                Oldest
              </SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => {
            if(value === 'all') setLimit(products.length);
            else setLimit(Number(value));
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Show" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem
                value={"all"}
                className="hover:bg-gray-200 cursor-pointer"
              >
                All Products
              </SelectItem>
              {Array.from({ length: 5 }).map((_, index) => (
                <SelectItem
                  value={String(index + 1)}
                  key={index}
                  className="hover:bg-gray-200 cursor-pointer"
                >
                  {index + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end my-4">
        <h1 className="text-sm">
          {products.length} <span className="text-gray-500">Result Founds</span>
        </h1>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-8">
        {filteredProducts.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-8">
          <Newsletter isSosmed={false}/>
      </div>
    </div>
  );
}
