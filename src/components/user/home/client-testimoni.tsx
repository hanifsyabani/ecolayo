"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { GetAllFeedback } from "@/service/admin/feedback";

export default function ClientTestimoni() {
  const { data: feedback, isLoading: isLoadingFeedback } = useQuery({
    queryFn: () => GetAllFeedback(),
    queryKey: ["dataFeedback"],
  });

  if (isLoadingFeedback) return <div className="spinner"></div>;
  return (
    <div className=" px-4 py-6 mt-10 bg-gray-200 ">
      <div className="text-center text-2xl">
        <h1 className="font-semibold">Customer Testimoni</h1>
      </div>
      <Swiper
        spaceBetween={30}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3, 
          },
        }}
        className=" mt-10"
      >
        {feedback?.map((item: any, index: number) => (
          <SwiperSlide key={index} className="rounded-xl">
            <div className="h-52 p-4 space-y-4 cursor-pointer">
              <FaQuoteLeft size={30} className="opacity-70 text-primary" />
              <p className="text-sm text-gray-600 w-full ">{item?.message}</p>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                  <div className="text-sm">
                    <h1>{item?.user?.username}</h1>
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
