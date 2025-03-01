import FormAddBanner from "@/components/admin/banner/form-add-banner";
import db from "@/lib/db";
import toast from "react-hot-toast";

interface BannerPageProps {
  params: {
    bannerid: string;
  };
}
export default async function page(props: BannerPageProps) {
  const banner = await db.banner.findUnique({
    where: {
      id: props.params.bannerid,
    },
  });

  return (
    <div className="px-8 mt-6 ">
      <FormAddBanner datas={banner} />
    </div>
  );
}
