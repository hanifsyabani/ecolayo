import { BannerColumn } from "@/components/admin/banner/columns-banner";
import ListBanner from "@/components/admin/banner/list-banner";
import { Card, CardContent } from "@/components/ui/card";
import db from "@/lib/db";
import { format } from "date-fns";

export default async function page({
  params,
}: {
  params: { storeid: string };
}) {
  const banner = await db.banner.findMany({
    where: {
      storeid: params.storeid,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBanners: BannerColumn[] = banner.map((item) => ({
    id: item.id,
    label: item.label,
    categoryBanner: item.categoryBanner,
    createdAt: format(item.createdAt, "MMM do, yyyy"),
  }));

  return (
    <Card className="px-3 py-8">
      <CardContent className="bg-white py-4 rounded-xl">
        <ListBanner data={formattedBanners} />
      </CardContent>
    </Card>
  );
}
