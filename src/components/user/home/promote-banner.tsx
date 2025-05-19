"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { GetBanners } from "@/service/admin/banners";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function PromoteBanner() {
  const { data: banners, isLoading: isLoadingBanners } = useQuery({
    queryFn: () => GetBanners(),
    queryKey: ["dataBanners"],
  });

  const promoteBanners = banners?.filter(
    (banner: any) => banner.categoryBanner === "promote"
  );

  return (
    <>
      <div className="flex justify-evenly items-center mt-32">
        {isLoadingBanners ? (
          Array.from({ length:  3 }).map((_, index) => (
            <Skeleton key={index} className="w-52 h-44 rounded-xl" />
          ))
        ) : (
          <>
            {promoteBanners?.map((item: any) => (
              <div
                key={item.id}
                className="w-[30%] hover:shadow-lg cursor-pointer p-4"
              >
                <Image
                  width={100}
                  height={100}
                  src={item.imageUrl}
                  alt="promotebanner"
                  className="w-full"
                />
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
