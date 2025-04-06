import FormAddBanner from "@/components/admin/banner/form-add-banner";
import db from "@/lib/db";

export default async function page({
  params,
}: {
  params: { bannerid: string };
}) {
  const banner = await db.banner.findUnique({
    where: {
      id: params.bannerid,
    },
  });

  return (
    <div className="px-8 mt-6 ">
      <FormAddBanner datas={banner} />
    </div>
  );
}
