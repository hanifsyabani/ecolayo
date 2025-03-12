"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

interface Banner {
  imageUrl: string;
  label: string;
}

export default function HeadingBanner() {
  const [banners, setBanners] = useState<Banner | null>(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get(
          "/api/af990241-e9fd-458c-9612-47ea908df21f/banner/b2e7beca-ced3-43da-a1f6-9e124a0d6881"
        );
        setBanners(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchBanner();
  }, [])


  return (
    <div className="p-6 rounded-xl">
      <div
        className="bg-cover rounded-xl aspect-[4/1] w-full"
        style={{
          backgroundImage: `url(${banners?.imageUrl})`,
          backgroundPosition: "center",
        }}
      >
        <div className="w-full h-full flex justify-center items-center ">
          <div className="text-3xl font-bold text-white">{banners?.label}</div>
        </div>
      </div>
    </div>
  );
}
