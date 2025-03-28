"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import TitleHome from "./title-home";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

export default function ClientTestimoni() {
  return (
    <div className="mt-20 px-4 py-6 bg-gray-300">
      <TitleHome title="Client Testimoni" link="/testimoni" />
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className=" mt-10"
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <SwiperSlide key={index}>
            <div className="h-52 p-4 space-y-4 cursor-pointer">
              <FaQuoteLeft size={30} className="opacity-50 text-primary" />
              <p className="text-sm text-gray-600 w-full ">
                Saya sangat puas berbelanja di Ecolayo! Produknya berkualitas,
                harga terjangkau, dan pengirimannya cepat. Pasti bakal belanja
                lagi!
              </p>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                  <div className="text-sm">
                    <h1 >John Doe</h1>
                    <p className="text-gray-500">Customer</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FaStar size={10} key={index} className="text-yellow-500" />
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
