"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";
import {  BannerColumn, Columns } from "./columns-banner";
import { DataTable } from "@/components/ui/data-table";
import { useQuery } from "@tanstack/react-query";
import { GetBanners } from "@/service/banners";
import { format } from "date-fns";


export default function ListBanner() {

  const {data: banners, isLoading:isLoadingBanners, refetch:refetchBanners} = useQuery({
    queryFn: () => GetBanners(),
    queryKey: ['dataBanners']
  })

  const formattedBanners: BannerColumn[] = (banners ?? []).map((item:any) => ({
    id: item.id,
    label: item.label,
    categoryBanner: item.categoryBanner,
    createdAt: format(item.createdAt, "MMM do, yyyy"),
  }));

  if(isLoadingBanners) return <div className="spinner"/>

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Banner" description="Set banner for shop " />
        <Link href={`/admin/banners/new`}>
          <Button className="text-white text-sm bg-secondary">
            <Plus /> Add New
          </Button>
        </Link>
      </div>
      <Separator className="my-4 bg-gray-300" />

      <DataTable data={formattedBanners} columns={Columns(refetchBanners)} searchKey="label" />
    </>
  );
}
