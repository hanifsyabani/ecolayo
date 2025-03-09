import SettingForm from "@/components/admin/settings/setting-form";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface SettingsPageProps {
  params: {
    storeid: string;
  };
}

export default async function page(props: SettingsPageProps) {
   const session = await getServerSession(authOptions)
    const userId = session?.user.id

  if (!userId) redirect("/login");

  const store = await db.store.findFirst({
    where: {
      id: props.params.storeid,
      userId,
    },
  });

  if (!store) redirect("/");

  return (
    <div className="px-8 mt-6">
      <SettingForm datas={store} />
    </div>
  );
}
