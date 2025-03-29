"use client";

import React, { useEffect, useState } from "react";
import Descriptions from "./descriptions";
import AdditionalInfo from "./additional-info";
import Feedback from "./feedback";
import { ProductProps } from "@/components/interface/product";
import ProductCard from "./product-card";
import axios from "axios";
import Newsletter from "./newsletter";
import { Separator } from "@/components/ui/separator";

export default function BottomDetailsProduct({ product }: ProductProps) {
  const [detailTab, setDetailTab] = useState("Descriptions");
  const [relatedProducts, setRelatedProducts] = useState<ProductProps[]>([]);
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `/api/af990241-e9fd-458c-9612-47ea908df21f/products/category/${product?.categoryid}`
        );
        setRelatedProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);


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
              {relatedProducts.map((productitem: any) => (
                <ProductCard product={productitem} key={productitem.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 bg-[#F7F7F7] px-6 py-8">
        <Newsletter isSosmed={true}/>
      </div>
    </>
  );
}
