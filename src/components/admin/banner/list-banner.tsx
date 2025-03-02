'use client'

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BannerColumn, BannerColumns} from "./columns-banner";
import { DataTable } from "@/components/ui/data-table";

interface BannerProps{
  data: BannerColumn[]
}

export default function ListBanner(data: BannerProps) {
  const params = useParams()

  
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Banner" description="Set banner for shop " />
        <Link href={`/admin/store/${params.storeid}/banners/new`}>
          <Button className="text-white text-sm bg-secondary">
            <Plus /> Add New
          </Button>
        </Link>
      </div>
      <Separator className="my-4 bg-gray-300" />

      <DataTable data={data.data} columns={BannerColumns} searchKey="label"/>
    </>
  );
}
