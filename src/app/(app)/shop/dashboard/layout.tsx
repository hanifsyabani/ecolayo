import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { dashboardUserItem } from "@/lib/item";
import NavigationSidebar from "@/components/user/dashboard/navigation-sidebar";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="py-10 px-6">
      <div className="flex gap-7">
        <Card className="basis-1/4">
          <CardContent className="bg-white p-4">
            <h1 className="font-semibold">Navigation</h1>
            <NavigationSidebar/>
          </CardContent>
        </Card>
        <div className="basis-3/4">{children}</div>
      </div>
    </section>
  );
}
