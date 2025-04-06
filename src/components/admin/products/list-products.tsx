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
import { format } from "date-fns";

export default function ListProducts() {

  const { data: products, isLoading: isLoadingProducts, refetch: refetchProducts } = useQuery({
    queryFn: () => GetProducts(),
    queryKey: ["dataProducts"],
  });

  // if(!products){
  //   return <div>No Product Found</div>
  // }

  const formattedProducts: ProductColumn[] = (products ?? []).map((item: any) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price),
    category: item.category.name,
    tag: item.tag.map((tag: any) => tag.name).join(", "),
    createdAt: format(item.createdAt, "MMM do, yyyy"),
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
