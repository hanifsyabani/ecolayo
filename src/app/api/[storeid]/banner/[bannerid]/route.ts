import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { bannerid: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
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
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (!userId) throw new Error("Unauthenticated");

    const { label, imageUrl, categoryBanner } = await req.json();

    if (!label) throw new Error("Label must be provided");
    if (!imageUrl) throw new Error("Image URL must be provided");
    if (!categoryBanner) throw new Error("Category banner must be provided");

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
        categoryBanner
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
    const session = await getServerSession(authOptions);
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

    const banner = await db.banner.findUnique({
      where: { id: params.bannerid },
    });
    
    if (!banner) {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 });
    }

    if (!storeByUserId) throw new Error("Store not found");

    await db.banner.delete({
      where: {
        // storeid: params.storeid,
        id: params.bannerid,
      },
    });

    return NextResponse.json({ message: "Banner deleted successfully" });
  } catch (error: any) {
    console.log("error : ",error)
    throw new Error(error);
  }
}
