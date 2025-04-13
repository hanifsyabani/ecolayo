"use client";

import { commonStats } from "@/lib/item";
import { GetBanners } from "@/service/banners";
import { GetCategories } from "@/service/categories";
import { GetProducts } from "@/service/products";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "../ui/card";
import { ImStatsBars2 } from "react-icons/im";
import { GetUsers } from "@/service/users";


export default function Statistics() {
  const { data: banners, isLoading: isLoadingBanners } = useQuery({
    queryFn: () => GetBanners(),
    queryKey: ["dataBanners"],
  });
  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryFn: () => GetCategories(),
    queryKey: ["dataCategories"],
  });
  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryFn: () => GetProducts(),
    queryKey: ["dataProducts"],
  });

  const {data: users, isLoading: isLoadingUsers} = useQuery({
    queryFn: () => GetUsers(),
    queryKey: ["dataUsers"],
  })

  // console.log(banners.length);
  // console.log(products.length);
  // console.log(categories.length);

  const colorClasses = {
    totalUsers: "bg-blue-500",
    totalStores: "bg-green-500",
    totalProducts: "bg-yellow-500",
    totalCategories: "bg-red-500",
  };
  const textColorClasses = {
    totalUsers: "text-blue-500",
    totalStores: "text-green-500",
    totalProducts: "text-yellow-500",
    totalCategories: "text-red-500",
  };

  const statsWithValues = commonStats.map((stat) => ({
    ...stat,
    value:
      stat.key === "totalUsers"
        ? users?.length
        : stat.key === "totalStores"
        ? banners?.length
        : stat.key === "totalProducts"
        ? products?.length
        : stat.key === "totalCategories"
        ? categories?.length
        : 0,
  }));

  if (isLoadingBanners || isLoadingCategories || isLoadingProducts || isLoadingUsers)
    return <div className="spinner"></div>;

  return (
    <>
      {statsWithValues.map((item, index) => (
          <Card className="w-60 h-32" key={index}>
            <CardContent className="bg-white h-full py-4 rounded-xl">
              <div className="flex justify-between items-center">
                <h1 className="max-w-10 text-gray-500 text-sm font-semibold">
                  {item.title}
                </h1>
                <div
                  className={`p-2 rounded-full  ${
                    colorClasses[item.key as keyof typeof colorClasses]
                  }  text-white `}
                >
                  <item.icon size={30} />
                </div>
              </div>
              <p className="font-bold text-lg">{item.value}</p>
              <div className="flex justify-end">
                <ImStatsBars2
                  className={`${
                    textColorClasses[item.key as keyof typeof textColorClasses]
                  } `}
                  size={25}
                />
              </div>
            </CardContent>
          </Card>
        ))}
    </>
  );
}
