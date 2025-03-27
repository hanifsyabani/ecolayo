import { Card, CardContent } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { commonStats } from "@/lib/item";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ImStatsBars2 } from "react-icons/im";

interface PageProps {
  params: {
    storeid: string;
  };
}

export default async function page(props: PageProps) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) redirect("/login");

  const store = await db.store.findFirst({
    where: {
      id: props.params.storeid,
      userId,
    },
    include:{
      banners:true,
      product: true,
      categories: true
    }
  });

  if (!store) redirect("/");

  const colorClasses = {
    totalUsers: "bg-blue-500",
    totalStores: "bg-green-500",
    totalProducts: "bg-yellow-500",
    totalCategories: "bg-red-500",
  };
  const textColorClasses = {
    totalUsers: "text-blue-500",
    totalStores: "text-green-500",
    totalProducts: "text-yellow-500",
    totalCategories: "text-red-500",
  };

  const statsWithValues = commonStats.map((stat) => ({
    ...stat,
    value:
      stat.key === "totalUsers"
        ? 1 // Misalkan hanya admin yang memiliki akses
        : stat.key === "totalStores"
        ? store.banners.length
        : stat.key === "totalProducts"
        ? store.product.length
        : stat.key === "totalCategories"
        ? store.categories.length
        : 0,
  }));

  return (
    <>
      <h1 className="text-2xl font-semibold p-3">Admin Dashboard</h1>
      <div className="flex justify-evenly flex-wrap items-center">
        {statsWithValues.map((item, index) => (
          <Card className="w-60 h-32" key={index}>
            <CardContent className="bg-white h-full py-4 rounded-xl">
              <div className="flex justify-between items-center">
                <h1 className="max-w-10 text-gray-500 text-sm font-semibold">
                  {item.title}
                </h1>
                <div
                  className={`p-2 rounded-full  ${
                    colorClasses[item.key as keyof typeof colorClasses]
                  }  text-white `}
                >
                  <item.icon size={30} />
                </div>
              </div>
              <p className="font-bold text-lg">{item.value}</p>
              <div className="flex justify-end">
                <ImStatsBars2
                  className={`${
                    textColorClasses[item.key as keyof typeof textColorClasses]
                  } `}
                  size={25}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
