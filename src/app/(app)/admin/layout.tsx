import SidebarAdmin from "@/components/admin/sidebar-admin";
import Navbar from "@/components/admin/navbar";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) redirect("/login");


  return (
    <SidebarProvider admin={true}>
      <SidebarAdmin />
      <div className="w-full bg-gray-200 ">
        <Navbar />
        {children}
      </div>
    </SidebarProvider>
  );
}
