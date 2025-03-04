import FormAddBanner from "@/components/admin/banner/form-add-banner";
import db from "@/lib/db";

export default async function page({
  params,
}: {
  params: { categoryid: string };
}) {
  const category = await db.category.findUnique({
    where: {
      id: params.categoryid,
    },
  });

  return (
    <div className="px-8 mt-6 ">
      <FormAddBanner datas={category} />
    </div>
  );
}
