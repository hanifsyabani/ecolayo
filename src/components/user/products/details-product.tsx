"use client";

import React, { useState } from "react";
import Descriptions from "./descriptions";
import AdditionalInfo from "./additional-info";
import Feedback from "./feedback";
import { Button } from "@/components/ui/button";
import { ProductProps } from "@/components/interface/product";
import ProductCard from "./product-card";

export default function DetailsProduct({ product }: ProductProps) {
  const [detailTab, setDetailTab] = useState("Descriptions");
  const tabs = ["Descriptions", "Additional Information", "Customer Feedback "];

  function renderContent(tab: string) {
    switch (tab) {
      case "Descriptions":
        return <Descriptions product={product} />;
      case "Additional":
        return <AdditionalInfo />;
      case "Feedback":
        return <Feedback />;
    }
  }

  return (
    <div className="mt-20">
      <div className="flex justify-center items-center gap-10 ">
        {tabs.map((tab) => (
          <Button
            className={`bg-white ${
              tab === detailTab ? "text-black border-primary " : "text-gray-500"
            }  hover:bg-white hover:border-primary border-b-2 border-white`}
            key={tab}
            onClick={() => setDetailTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>

      <div>{renderContent(detailTab)}</div>

      <div className="mt-20">
        <h1 className="text-center text-2xl font-semibold">Related Products</h1>
        <div className="grid grid-cols-4 gap-4">
          <ProductCard product={product} categories={null} key={product?.id} />
        </div>
      </div>
    </div>
  );
}
