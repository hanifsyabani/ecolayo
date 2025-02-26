import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const store = await db.store.findFirst({
    where: {
      userId,
    },
  });

  if (store) redirect(`/admin/store/${store.id}`);
  // Jika tidak ada store, layout akan tetap merender children

  return (
    <>
      {children}
    </>
  );
}
