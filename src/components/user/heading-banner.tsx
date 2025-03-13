"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Banner {
  imageUrl: string;
  label: string;
}

export default function HeadingBanner() {
  const [banners, setBanners] = useState<Banner[] | null>(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get(
          "/api/af990241-e9fd-458c-9612-47ea908df21f/banner"
        );
        setBanners(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchBanner();
  }, []);

  const bannerFirst = banners ? banners[0] : null;
  const bannerSecond = banners ? banners[4] : null;
  const bannerThird = banners ? banners[5] : null;

  return (
    <div className="flex justify-center p-6 items-center gap-4">
      <div
        className="bg-cover rounded-xl aspect-[1.8/1] w-[65%] "
        style={{
          backgroundImage: `url(${bannerFirst?.imageUrl})`,
          backgroundPosition: "center",
        }}
      >
        <div className="w-full h-full flex pl-10 items-center ">
          <div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-white  max-w-sm tracking-wider">
                Fresh & Healthy Organic Food
              </h1>
              <div className="flex gap-2 ">
                <div className="bg-green-300 w-1"></div>
                <div className="text-white max-w-md">
                  <p className="text-lg">
                    Sale up to{" "}
                    <span className="bg-orange-500 p-1 rounded-md ">
                      30% OFF
                    </span>
                  </p>
                  <p className="font-extralight">
                    Free shipping on all your order
                  </p>
                </div>
              </div>
            </div>
            <Button className="bg-white text-primary rounded-full text-sm mt-10 hover:bg-gray-100">
              Shop Now <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-[35%] space-y-4">
        <div
          className="bg-cover rounded-xl aspect-[2/1]"
          style={{
            backgroundImage: `url(${bannerSecond?.imageUrl})`,
            backgroundPosition: "center",
          }}
        >
          <div className="w-full h-full flex items-center pl-7 ">
            <div className="space-y-4">
              <div>
                <h5>SUMMER SALE</h5>
                <h1 className="text-4xl font-semibold">75% OFF</h1>
              </div>
              <p className="text-xs text-gray-500">Only Fruit & Vegetables</p>
              <Link
                href={"/"}
                className="text-primary flex items-center gap-2 font-bold"
              >
                <p>Shop Now </p>
                <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
        <div
          className="bg-cover rounded-xl aspect-[2/1] "
          style={{
            backgroundImage: `url(${bannerThird?.imageUrl})`,
            backgroundPosition: "center",
          }}
        >
          <div className="w-full h-full flex justify-center items-center ">
            <div className="text-center text-white space-y-4">
              <p>BEST DEAL</p>
              <h1 className="text-3xl max-w-xs font-bold">
                Special Products Deal of the Month
              </h1>
              <Link
                href={"/"}
                className="text-primary flex items-center justify-center gap-2 font-bold"
              >
                <p>Shop Now </p>
                <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
