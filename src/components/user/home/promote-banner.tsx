"use client";

import { Banner } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function PromoteBanner() {
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

  const promoteBanners = banners?.filter(
    (banner) => banner.categoryBanner === "promote"
  );

  return (
    <>
      <div className="flex justify-evenly items-center mt-32">
        {promoteBanners?.map((item) => (
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
      </div>
    </>
  );
}
