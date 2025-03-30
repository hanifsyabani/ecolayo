"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Category, Images, Product, Tag } from "@prisma/client";
import Image from "next/image";
import HeadDetailProduct from "./head-detail-product";
import { Badge } from "@/components/ui/badge";

interface PreviewProductProps {
  open: boolean;
  setOpenDialog: (open: boolean) => void;
  product:
    | (Omit<Product, "price"> & {
        price: number;
        images: Images[];
        tag: Tag[];
        category: Category;
      })
    | null;
}

export default function PreviewProduct({
  open,
  setOpenDialog,
  product,
}: PreviewProductProps) {
  const isStock = product?.stock ? "In Stock" : "Out of Stock";
  return (
    <>
      <Dialog open={open} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-white max-w-[80%] h-[80%] flex justify-center">
          <div className="w-1/2 h-full flex justify-center items-center">
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
              <div className="flex gap-3 ">
                <DialogTitle className="text-3xl">{product?.name}</DialogTitle>
                <Badge
                  className={`text-xs text-white p-1 ${
                    product?.stock ? "bg-primary" : "bg-red-500"
                  }`}
                >
                  {isStock}
                </Badge>
              </div>
            </DialogHeader>
            <HeadDetailProduct product={product} setDialog={setOpenDialog} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
