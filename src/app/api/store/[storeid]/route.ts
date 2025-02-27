import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeid: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthenticated");

    const { name } = await req.json();
    if (!name) throw new Error("Name must be provided");

    const store = await db.store.update({
      where: {
        userId,
        id: params.storeid,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(store);
  } catch (error: any) {
    throw new Error(error);
  }
}


export async function DELETE(
  req: Request,
  { params }: { params: { storeid: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthenticated");

    const store = await db.store.delete({
      where: {
        id: params.storeid,
        userId,
      },
    });

    return NextResponse.json(store)

  } catch (error: any) {
    throw new Error(error);
  }
}
