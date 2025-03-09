import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) redirect("/login");

  if (session?.user.role === "user") {
    redirect("/user");
  }

  const store = await db.store.findFirst({
    where: {
      userId: session?.user?.id,
    },
  });

  if (store) redirect(`/admin/store/${store.id}`);
  // Jika tidak ada store, layout akan tetap merender children

  return <>{children}</>;
}
