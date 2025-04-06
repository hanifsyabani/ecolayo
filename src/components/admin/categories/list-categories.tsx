"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CategoryColumn, Columns } from "./columns-category";
import { DataTable } from "@/components/ui/data-table";

interface CategoryProps {
  data: CategoryColumn[];
}

export default function ListCategories(data: CategoryProps) {
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Categories" description="Set category for shop " />
        <Link href={`/admin/store/${params.storeid}/categories/new`}>
          <Button className="text-white text-sm bg-secondary">
            <Plus /> Add New
          </Button>
        </Link>
      </div>
      <Separator className="my-4 bg-gray-300" />

      <DataTable data={data.data} columns={Columns} searchKey="name" />

    </>
  );
}
