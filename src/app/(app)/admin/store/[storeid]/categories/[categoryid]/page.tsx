import FormAddCategory from "@/components/admin/categories/form-add-category";
import db from "@/lib/db";

export default async function page({
  params,
}: {
  params: { categoryid: string, storeid:string };
}) {
  const category = await db.category.findUnique({
    where: {
      id: params.categoryid,
    },
  });

  const banners = await db.banner.findMany({
    where:{
      storeid: params.storeid,
    }
  })

  return (
    <div className="px-8 mt-6 ">
      <FormAddCategory datas={category} banners={banners} />
    </div>
  );
}
