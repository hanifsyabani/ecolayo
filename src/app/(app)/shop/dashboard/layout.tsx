import Link from "next/link";
import { dashboardUserItem } from "@/lib/item";
import NavigationSidebar from "@/components/user/dashboard/navigation-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { List } from "lucide-react";
import SidebarMobile from "@/components/user/dashboard/sidebar-mobile";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider admin={true}>
      <NavigationSidebar />
      <SidebarMobile/>
      <div className="w-full lg:mt-10 mt-16 p-4">{children}</div>
    </SidebarProvider>
  );
}
