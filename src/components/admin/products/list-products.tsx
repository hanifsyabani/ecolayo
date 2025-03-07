"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {  Columns, ProductColumn } from "./columns-products";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface ProductProps {
  data: ProductColumn[];
}

export default function ListProducts(data: ProductProps) {
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Products" description="Set product for shop " />
        <Link href={`/admin/store/${params.storeid}/products/new`}>
          <Button className="text-white text-sm bg-secondary">
            <Plus /> Add New
          </Button>
        </Link>
      </div>
      <Separator className="my-4 bg-gray-300" />

      <DataTable data={data.data} columns={Columns} searchKey="name" />

      <Heading title="API" description="API calls for Categories"/> 
      <ApiList idIndikator="productid" nameIndikator="products"/>
    </>
  );
}
