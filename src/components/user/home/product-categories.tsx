"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import TitleHome from "./title-home";
import { useQuery } from "@tanstack/react-query";
import { GetCategories } from "@/service/categories";

interface CategoriesProps{
  id:string
  name:string,
  imageUrl :string
}

export default function ProductCategories() {

  const {data: categories, isLoading:isLoadingCategories} = useQuery({
    queryFn: () => GetCategories(),
    queryKey: ["dataCategories"],
  })


  return (
    <div className="px-4 pb-8 overflow-hidden">
      <TitleHome title="Product Categories" link="/products/categories" />

      <div className="flex justify-evenly items-center mt-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-14">
          {isLoadingCategories
            ? Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="w-52 h-20 rounded-xl" />
              ))
            : categories.map((item: CategoriesProps) => (
                <div
                  key={item.id}
                  className="w-52 h-20 flex flex-col items-center"
                >
                  <Image  
                    src={item?.imageUrl}
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
