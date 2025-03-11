import NavUser from "@/components/user/nav-user";
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

  const session = await getServerSession(authOptions)
  const userId = session?.user.id

  if(!userId) redirect("/login")
  if(session?.user.role !== "user") redirect("/login")

  const category = await db.category.findMany();
  return (
    <div>
      <NavUser category={category} />
      {children}
    </div>
  );
}
