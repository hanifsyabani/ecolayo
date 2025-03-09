import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { bannerid: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthenticated");

    if (!params.bannerid) throw new Error("Banner ID must be provided");

    const banner = await db.banner.findUnique({
      where: {
        id: params.bannerid,
      },
    });

    return NextResponse.json(banner);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { bannerid: string; storeid: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthenticated");

    const { label, imageUrl } = await req.json();

    if (!label) throw new Error("Label must be provided");
    if (!imageUrl) throw new Error("Image URL must be provided");

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeid,
        userId,
      },
    });

    if (!storeByUserId) throw new Error("Store not found");

    const banner = await db.banner.update({
      where: {
        id: params.bannerid,
      },

      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(banner);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeid: string; bannerid: string } }
) {
  try {
    const session = await getServerSession();
    const userId = session?.user.id;
    if (!userId) throw new Error("Unauthenticated");

    console.log(params.storeid, " ", params.bannerid);

    // if(!params.bannerid) throw new Error("Banner ID must be provided");

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeid,
        userId,
      },
    });

    if (!storeByUserId) throw new Error("Store not found");

    const banner = await db.banner.delete({
      where: {
        id: params.bannerid,
      },
    });

    return NextResponse.json(banner);
  } catch (error: any) {
    throw new Error(error);
  }
}
