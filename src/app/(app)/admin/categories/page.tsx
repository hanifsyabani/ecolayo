import { BannerColumn } from "@/components/admin/banner/columns-banner";
import { CategoryColumn } from "@/components/admin/categories/columns-category";
import ListCategories from "@/components/admin/categories/list-categories";
import { Card, CardContent } from "@/components/ui/card";
import db from "@/lib/db";
import { format } from "date-fns";

export default async function page({
  params,
}: {
  params: { storeid: string };
}) {
  const banner = await db.category.findMany({
    where: {
      storeid: params.storeid,
    },
    include: {
      banner: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = banner.map((item) => ({
    id: item.id,
    name: item.name,
    bannerLabel: item.banner.label,
    createdAt: format(item.createdAt, "MMM do, yyyy"),
  }));

  return (
    <Card className="px-3 py-8">
      <CardContent className="bg-white py-4 rounded-xl">
        <ListCategories data={formattedCategories} />
      </CardContent>
    </Card>
  );
}
