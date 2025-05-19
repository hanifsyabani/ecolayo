"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";
import { CategoryColumn, Columns } from "./columns-category";
import { DataTable } from "@/components/ui/data-table";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { GetCategories } from "@/service/admin/categories";

export default function ListCategories() {

  const { data: categories, isLoading: isLoadingCategories, refetch: refetchCategories } = useQuery({
    queryFn: () => GetCategories(),
    queryKey: ["dataCategories"],
  });

  const formattedCategories: CategoryColumn[] = (categories ?? []).map(
    (category: any) => ({
      id: category.id,
      name: category.name,
      imageUrl: category.imageUrl,
      createdAt: format(category.createdAt, "MMM do, yyyy"),
    })
  );

  if (isLoadingCategories) {
    return <div className="spinner" />;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Categories" description="Set category for shop " />
        <Link href={`/admin/categories/new`}>
          <Button className="text-white text-sm bg-secondary">
            <Plus /> Add New
          </Button>
        </Link>
      </div>
      <Separator className="my-4 bg-gray-300" />

      <DataTable data={formattedCategories} columns={Columns(refetchCategories)} searchKey="name" />
    </>
  );
}
