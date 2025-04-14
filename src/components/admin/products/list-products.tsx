"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Columns, ProductColumn } from "./columns-products";
import { DataTable } from "@/components/ui/data-table";
import { useQuery } from "@tanstack/react-query";
import { GetProducts } from "@/service/products";
import { formatter } from "@/lib/utils";

export default function ListProducts() {

  const { data: products, isLoading: isLoadingProducts, refetch: refetchProducts } = useQuery({
    queryFn: () => GetProducts(),
    queryKey: ["dataProducts"],
  });

  const formattedProducts: ProductColumn[] = (products ?? []).map((product: any) => ({
    id: product.id,
    name: product.name,
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    price: formatter.format(product.price),
    image : product.images[0].url,
    category: product.category.name,
    tag: product.tag.map((tag: any) => tag.name).join(", "),
  }));

  if (isLoadingProducts) {
    return <div className="spinner"/>
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Products" description="Set product for shop " />
        <Link href={`/admin/products/new`}>
          <Button className="text-white text-sm bg-secondary">
            <Plus /> Add New
          </Button>
        </Link>
      </div>
      <Separator className="my-4 bg-gray-300" />

      <DataTable data={formattedProducts} columns={Columns(refetchProducts)} searchKey="name" />

    </>
  );
}
