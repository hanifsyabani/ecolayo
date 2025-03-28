"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Banner, Category } from "@prisma/client";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import TitleHome from "./title-home";

interface CategoryWithBanner extends Category {
  banner: Banner;
}

export default function ProductCategories() {
  const [category, setCategory] = useState<CategoryWithBanner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<CategoryWithBanner[]>(
          "/api/af990241-e9fd-458c-9612-47ea908df21f/categories"
        );
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="px-4 pb-8 overflow-hidden">
      <TitleHome title="Product Categories" link="/products/categories" />

      <div className="flex justify-evenly items-center mt-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-14">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="w-52 h-20 rounded-xl" />
              ))
            : category.map((item) => (
                <div
                  key={item.id}
                  className="w-52 h-20 flex flex-col items-center"
                >
                  <Image
                    src={item?.banner?.imageUrl}
                    width={100}
                    height={100}
                    alt="categoryimg"
                    className="w-32 h-full bg-contain rounded-xl"
                  />
                  <h1 className="text-sm font-medium text-center pt-2">
                    {item.name}
                  </h1>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
