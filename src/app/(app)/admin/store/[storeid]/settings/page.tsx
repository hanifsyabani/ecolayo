import SettingForm from "@/components/admin/settings/setting-form";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface SettingsPageProps {
  params: {
    storeid: string;
  };
}

export default async function page(props: SettingsPageProps) {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const store = await db.store.findFirst({
    where: {
      id: props.params.storeid,
      userId,
    },
  });

  if (!store) redirect("/");

  return (
    <div className="px-8 mt-6">
      <SettingForm data={store} />
    </div>
  );
}
