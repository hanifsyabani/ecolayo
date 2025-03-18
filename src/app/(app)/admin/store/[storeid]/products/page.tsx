
import { ProductColumn } from "@/components/admin/products/columns-products";
import ListProducts from "@/components/admin/products/list-products";
import db from "@/lib/db";
import { formatter } from "@/lib/utils";
import { format } from "date-fns";

export default async function page({
  params,
}: {
  params: { storeid: string };
}) {
  const product = await db.product.findMany({
    where: {
      storeid: params.storeid,
    },
    include: {
      category: true,
      tag:true
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = product.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price.toNumber()),
    category : item.category.name,
    tag : item.tag.map((tag) => tag.name).join(", "),
    createdAt: format(item.createdAt, "MMM do, yyyy"),
  }));

  return (
    <div className="px-8 py-10 ">
      <ListProducts data={formattedProducts} />
    </div>
  );
}
