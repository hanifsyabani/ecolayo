import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Images, Product } from "@prisma/client";
import { Heart, ShoppingCart } from "lucide-react";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLess,
  FaMinus,
  FaPinterest,
  FaPlus,
  FaStar,
  FaTwitter,
} from "react-icons/fa";

interface HeadProductProps {
  product:
    | (Omit<Product, "price"> & {
        price: number;
        images: Images[];
      })
    | null;
}

export default function HeadDetailProduct({ product }: HeadProductProps) {
  const formatter = new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    style: "currency",
    currency: "IDR",
  });
  return (
    <div>
      <div className="flex items-center gap-2 mt-2">
        <div className="flex items-center ">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar
              key={i}
              size={10}
              className={cn(
                product?.stars && i < product.stars
                  ? "text-yellow-500"
                  : "text-gray-300"
              )}
            />
          ))}
        </div>
        <p className="text-xs text-gray-400">4 Reviews</p>
      </div>

      <h1 className="text-xl text-secondary font-semibold py-4">
        {formatter.format(product?.price || 0)}
      </h1>

      <div className="flex justify-end">
        <div className="flex items-center gap-3">
          <p className="text-sm">Share Product</p>
          <div className="flex items-center gap-2">
            <FaFacebook
              size={30}
              className="hover:bg-primary rounded-full cursor-pointer p-1 text-gray-500 hover:text-white"
            />
            <FaInstagram
              size={30}
              className="hover:bg-primary rounded-full cursor-pointer p-1 text-gray-500 hover:text-white"
            />
            <FaTwitter
              size={30}
              className="hover:bg-primary rounded-full cursor-pointer p-1 text-gray-500 hover:text-white"
            />
            <FaPinterest
              size={30}
              className="hover:bg-primary rounded-full cursor-pointer p-1 text-gray-500 hover:text-white"
            />
          </div>
        </div>
      </div>

      <p className="my-6 text-gray-500 text-sm">{product?.shortDescription}</p>

      <div className="flex items-center justify-evenly gap-4">
        <div className="flex items-center gap-8 shadow-md rounded-full w-32 px-2 ">
          <FaMinus size={20} className="bg-gray-100 rounded-full p-1" />
          1
          <FaPlus size={20} className="bg-gray-100 rounded-full p-1" />
        </div>

        <Button className="text-white text-sm rounded-full w-60">
          <ShoppingCart /> Add to Cart
        </Button>

        <div className="bg-gray-200 rounded-full p-2">
          <Heart size={20} className="" />
        </div>
      </div>
    </div>
  );
}
