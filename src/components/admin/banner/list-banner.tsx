'use client'

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ListBanner() {
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
    </>
  );
}
