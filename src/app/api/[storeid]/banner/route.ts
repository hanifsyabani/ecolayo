import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeid: string } }
) {
  try {
    const { userId } = await auth();

    const { label, imageUrl } = await req.json();

    if (!userId) throw new Error("Unauthenticated");
    if (!label) throw new Error("Label must be provided");
    if (!imageUrl) throw new Error("Image URL must be provided");

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeid,
        userId,
      },
    });

    if (!storeByUserId) throw new Error("Store not found");

    const banner = await db.banner.create({
      data: {
        label,
        imageUrl,
        storeid: params.storeid,
      },
    });

    return NextResponse.json(banner);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeid: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) throw new Error("Unauthenticated");

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeid,
        userId,
      },
    });

    if (!storeByUserId) throw new Error("Store not found");

    const banner = await db.banner.findMany({
      where: {
        storeid: params.storeid,
      },
    });

    return NextResponse.json(banner);
  } catch (error: any) {
    throw new Error(error);
  }
}
