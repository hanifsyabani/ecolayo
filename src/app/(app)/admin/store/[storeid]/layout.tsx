import Navbar from "@/components/navbar";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
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
