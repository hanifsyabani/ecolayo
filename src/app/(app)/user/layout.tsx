import Footer from "@/components/user/footer";
import { SidebarProvider} from "@/components/ui/sidebar";
import NavUser from "@/components/user/nav-user";
import { SidebarCart } from "@/components/user/sidebar-cart";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) redirect("/login");
  if (session?.user.role !== "user") redirect("/login");

  // Kurang responsif untuk update data real-time → Perubahan kategori butuh reload halaman.
  // Tiap request akan memicu query ke database → Jika banyak pengguna mengakses, bisa membebani server.
  
  return (
    <SidebarProvider admin={false}>
      <div className="w-full">
        <NavUser />
        <div className="pt-32 ">{children}</div>
        <Footer/>
      </div>
      <SidebarCart />
    </SidebarProvider>
  );
}
