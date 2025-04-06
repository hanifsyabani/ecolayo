import SettingForm from "@/components/admin/settings/setting-form";
import { Card, CardContent } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface SettingsPageProps {
  params: {
    storeid: string;
  };
}

export default async function page(props: SettingsPageProps) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) redirect("/login");

  const store = await db.store.findFirst({
    where: {
      id: props.params.storeid,
      userId,
    },
  });

  if (!store) redirect("/");

  return (
    <Card className="px-3 py-8 ">
      <CardContent className="bg-white py-4 rounded-xl">
        <SettingForm datas={store} />
      </CardContent>
    </Card>
  );
}
