
import ChartDashboard from "@/components/admin/chart-dashboard";
import ChartProduct from "@/components/admin/chart-dashboard";
import Statistics from "@/components/admin/statistic";
import { Card, CardContent } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) redirect("/login");
  if (session.user.role !== "admin") redirect("/login");

  return (
    <>
      <Card className="px-3 py-8 ">
        <CardContent className="bg-white py-4 rounded-xl">
          <h1 className="text-2xl font-semibold p-3">Welcome Back, Admin</h1>
        </CardContent>
      </Card>
      <div className="flex justify-evenly flex-wrap items-center">
        <Statistics />
      </div>

      <div className="mt-10 px-3 ">
        <ChartDashboard/>
      </div>
    </>
  );
}
