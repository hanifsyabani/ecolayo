import { BannerColumn } from "@/components/admin/banner/columns-banner";
import ListBanner from "@/components/admin/banner/list-banner";
import db from "@/lib/db";
import {format} from 'date-fns'

export default async function page({
  params,
}: {
  params: { storeid: string };
}) {
  const banner = await db.banner.findMany({
    where: {
      storeid: params.storeid,
    },
    orderBy:{
      createdAt:"desc"
    }
  });

  const formattedBanners:BannerColumn[] = banner.map((item) =>({
    id: item.id,
    label : item.label,
    createdAt:format(item.createdAt, 'MMM do, yyyy')
  }))

  return (
    <div className="px-8 mt-6">
      <ListBanner data ={formattedBanners} />
    </div>
  );
}
