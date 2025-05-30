import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { dashboardUserItem } from "@/lib/item";
import NavigationSidebar from "@/components/user/dashboard/navigation-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider admin={true}>
      <NavigationSidebar />
      <div className="w-full mt-10 p-4">{children}</div>
    </SidebarProvider>
  );
}
