import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { categoryid: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthenticated");

    if (!params.categoryid) throw new Error("Category ID must be provided");

    const category = await db.category.findUnique({
      where: {
        id: params.categoryid,
      },
    });

    return NextResponse.json(category);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { categoryid: string; storeid: string } }
) {
  try {
    const session = await getServerSession();
    const userId = session?.user.id;
    if (!userId) throw new Error("Unauthenticated");

    const { name, bannerid } = await req.json();

    if (!name) throw new Error("name must be provided");
    if (!bannerid) throw new Error("Banner id must be provided");

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeid,
        userId,
      },
    });

    if (!storeByUserId) throw new Error("Store not found");

    const category = await db.category.update({
      where: {
        id: params.categoryid,
      },

      data: {
        name,
        bannerid,
      },
    });

    return NextResponse.json(category);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeid: string, categoryid: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthenticated");

    console.log(params.storeid, " ",params.categoryid)

    // if(!params.bannerid) throw new Error("Banner ID must be provided");

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeid,
        userId,
      },
    });

    if (!storeByUserId) throw new Error("Store not found");

    const banner = await db.category.delete({
      where: {
        id: params.categoryid,
      },
    });

    return NextResponse.json(banner);
  } catch (error: any) {
    throw new Error(error);
  }
}
