"use client";

import { Button } from "../../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "../../ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { GetBanners } from "@/service/admin/banners";

interface Banner {
  imageUrl: string;
  label: string;
  categoryBanner: string | null;
}

export default function HeadingBanner() {
  const { data: banners, isLoading: isLoadingBanners } = useQuery({
    queryFn: () => GetBanners(),
    queryKey: ["dataBanners"],
  });

  const mainBanner = banners
    ? banners.filter(
        (item: Banner) => item.categoryBanner === "main jumbotron"
      )[0]
    : null;
  const bannerSecond = banners
    ? banners.filter(
        (item: Banner) => item.categoryBanner === "sec jumbotron"
      )[0]
    : null;
  const bannerThird = banners
    ? banners.filter(
        (item: Banner) => item.categoryBanner === "third jumbotron"
      )[0]
    : null;

  return (
    <div className="lg:flex justify-center p-10 items-center gap-4">
      <div
        className="bg-cover rounded-xl aspect-[1.8/1] lg:w-[65%] "
        style={{
          backgroundImage: `url(${mainBanner?.imageUrl})`,
          backgroundPosition: "center",
        }}
      >
        {isLoadingBanners ? (
          <Skeleton className="w-full h-full rounded-xl" />
        ) : (
          <div className="w-full h-full flex items-center pt-32 pl-10 ">
            <Button className="bg-white hidden lg:block text-primary rounded-full text-sm lg:mt-10 hover:bg-gray-300">
              Shop Now <ArrowRight />
            </Button>
          </div>
        )}
      </div>
      <div className="lg:w-[35%] space-y-4 lg:block flex gap-2">
        <div
          className="bg-cover rounded-xl lg:aspect-[2/1] w-1/2 lg:w-full"
          style={{
            backgroundImage: `url(${bannerSecond?.imageUrl})`,
          }}
        >
          {isLoadingBanners ? (
            <Skeleton className="w-full h-full rounded-xl" />
          ) : (
            <div className="w-full h-full flex items-center pl-7 ">
              <div className="pt-20">
                <Link
                  href={"/"}
                  className="text-primary hidden lg:flex items-center gap-2 font-bold"
                >
                  <p>Shop Now </p>
                  <ArrowRight />
                </Link>
              </div>
            </div>
          )}
        </div>
        <div
          className="bg-cover rounded-xl lg:aspect-[2/1] w-1/2 lg:w-full"
          style={{
            backgroundImage: `url(${bannerThird?.imageUrl})`,
            backgroundPosition: "center",
          }}
        >
          {isLoadingBanners ? (
            <Skeleton className="w-full h-full rounded-xl" />
          ) : (
            <div className="w-full h-full flex justify-center items-center ">
              <div className="text-center pt-20 text-white space-y-4">
                <Link
                  href={"/"}
                  className="text-primary hover:text-white lg:flex items-center justify-center hidden  gap-2 font-bold"
                >
                  <p>Shop Now </p>
                  <ArrowRight />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
