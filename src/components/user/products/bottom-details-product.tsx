"use client";

import React, { useState } from "react";
import Descriptions from "./descriptions";
import AdditionalInfo from "./additional-info";
import { ProductProps } from "@/components/interface/product";
import Newsletter from "../newsletter";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { GetRelatedProductByCategory } from "@/service/shop/products";
import ProductCard from "./product-card";
import CustomerComment from "./customer-comment";

export default function BottomDetailsProduct({ product }: ProductProps) {
  const [detailTab, setDetailTab] = useState("Descriptions");
  const tabs = ["Descriptions", "Additional Info", "Customer Comment"];

  const { data: relatedProducts, isLoading: isLoadingRelated } = useQuery({
    queryFn: () => GetRelatedProductByCategory(product?.categoryid!, product?.id!),
    queryKey: ["dataRelatedProduct"],
  });

  function renderContent(tab: string) {
    switch (tab) {
      case "Descriptions":
        return <Descriptions product={product} />;
      case "Additional Info":
        return <AdditionalInfo />;
      case "Customer Comment":
        return <CustomerComment />;
    }
  }

  if (isLoadingRelated) return <div className="spinner"></div>;

  return (
    <>
      <div className="mt-20 px-4">
        <div className="flex justify-center items-center gap-10 ">
          {tabs.map((tab) => (
            <div
              className={`bg-white cursor-pointer ${
                tab === detailTab
                  ? "text-black border-primary "
                  : "text-gray-500"
              }  hover:bg-white hover:border-primary border-b-2 border-white`}
              key={tab}
              onClick={() => setDetailTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>

        <Separator className=" bg-gray-200 mt-4  " />

        <div>{renderContent(detailTab)}</div>

        <div className="mt-20">
          <h1 className="text-center text-2xl font-semibold">
            Related Products
          </h1>
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-4 gap-x-4">
              {relatedProducts?.map((productitem: any) => (
                <ProductCard product={productitem} key={productitem.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 bg-[#F7F7F7] px-6 py-8">
        <Newsletter isSosmed={true} />
      </div>
    </>
  );
}
