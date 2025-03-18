import Navbar from "@/components/navbar";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { storeid: string };
}) {

  if (!params?.storeid) {
    return <div>Loading...</div>; // Cegah error jika params belum ada
  }

  const session = await getServerSession(authOptions)
  const userId = session?.user.id

  if (!userId) redirect("/login");
  

  const store = await db.store.findFirst({
    where: {
      id: params.storeid,
      userId,
    },
  });

  if (!store) redirect("/");

  return (
    <div>
      <Navbar store_name={store.name} store_id={store.id}/> 
      {children}
    </div>
  );
}
