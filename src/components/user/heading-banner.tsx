"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

interface Banner {
  imageUrl: string;
  label: string;
  categoryBanner: string | null;
}

export default function HeadingBanner() {
  const [banners, setBanners] = useState<Banner[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get(
          "/api/af990241-e9fd-458c-9612-47ea908df21f/banner"
        );
        setBanners(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanner();
  }, []);

  const mainBanner = banners
    ? banners.filter((item) => item.categoryBanner === "main jumbotron")[0]
    : null;
  const bannerSecond = banners
    ? banners.filter((item) => item.categoryBanner === "sec jumbotron")[0]
    : null;
  const bannerThird = banners
    ? banners.filter((item) => item.categoryBanner === "third jumbotron")[0]
    : null;


  return (
    <div className="flex justify-center p-6 items-center gap-4">
      <div
        className="bg-cover rounded-xl aspect-[1.8/1] w-[65%] "
        style={{
          backgroundImage: `url(${mainBanner?.imageUrl})`,
          backgroundPosition: "center",
        }}
      >
        {isLoading ? (
          <Skeleton className="w-full h-full rounded-xl" />
        ) : (
          <div className="w-full h-full flex items-center pt-32 pl-10 ">
            <Button className="bg-white text-primary rounded-full text-sm mt-10 hover:bg-gray-300">
              Shop Now <ArrowRight />
            </Button>
          </div>
        )}
      </div>
      <div className="w-[35%] space-y-4">
        <div
          className="bg-cover rounded-xl aspect-[2/1]"
          style={{
            backgroundImage: `url(${bannerSecond?.imageUrl})`,
          }}
        >
          {isLoading ? (
            <Skeleton className="w-full h-full rounded-xl" />
          ) : (
            <div className="w-full h-full flex items-center pl-7 ">
              <div className="pt-20">
                <Link
                  href={"/"}
                  className="text-primary flex items-center gap-2 font-bold"
                >
                  <p>Shop Now </p>
                  <ArrowRight />
                </Link>
              </div>
            </div>
          )}
        </div>
        <div
          className="bg-cover rounded-xl aspect-[2/1] "
          style={{
            backgroundImage: `url(${bannerThird?.imageUrl})`,
            backgroundPosition: "center",
          }}
        >
          {isLoading ? (
            <Skeleton className="w-full h-full rounded-xl" />
          ) : (
            <div className="w-full h-full flex justify-center items-center ">
              <div className="text-center pt-20 text-white space-y-4">
                <Link
                  href={"/"}
                  className="text-primary hover:text-white flex items-center justify-center gap-2 font-bold"
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
