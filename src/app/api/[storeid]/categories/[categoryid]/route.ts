import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { categoryid: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
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
    const session = await getServerSession(authOptions);
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
  { params }: { params: { storeid: string; categoryid: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (!userId) throw new Error("Unauthenticated");

    console.log("store id: ",params.storeid, " ","category id: ", params.categoryid);

    // if(!params.bannerid) throw new Error("Banner ID must be provided");

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeid,
        userId,
      },
    });

    if (!storeByUserId) throw new Error("Store not found");

    await db.category.delete({
      where: {
        storeid: params.storeid,
        id: params.categoryid,
      },
    });
    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error: any) {
    throw new Error(error);
  }
}
