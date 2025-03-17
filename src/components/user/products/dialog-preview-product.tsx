"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Category, Images, Product } from "@prisma/client";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

interface PreviewProductProps {
  open: boolean;
  setOpenDialog: (open: boolean) => void;
  product:
    | (Omit<Product, "price"> & {
        price: number;
        images: Images[];
      })
    | null;
}

export default function PreviewProduct({
  open,
  setOpenDialog,
  product,
}: PreviewProductProps) {
  const formatter = new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    style: "currency",
    currency: "IDR",
  });
  return (
    <>
      <Dialog open={open} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-white max-w-[80%] flex justify-center">
          <div className="w-1/2 flex justify-center items-center">
            {product?.images &&
            product?.images.length > 0 &&
            product?.images[0]?.url ? (
              <Image
                src={product.images[0].url}
                width={200}
                height={200}
                alt={product.name}
                className="w-full h-full rounded-xl"
              />
            ) : (
              <div className="w-[200px] h-[200px] bg-gray-200 flex items-center justify-center">
                <span>No Image</span>
              </div>
            )}
          </div>
          <div className="w-1/2">
            <DialogHeader>
              <DialogTitle className="text-3xl">{product?.name}</DialogTitle>
            </DialogHeader>
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

            {/* <p>{product.}</p> */}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
