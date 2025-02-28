import Navbar from "@/components/navbar";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeid: string };
}) {
  const { userId } = await auth();

  if (!userId) redirect("sign-in");

  // console.log("params id",params.storeid);

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
