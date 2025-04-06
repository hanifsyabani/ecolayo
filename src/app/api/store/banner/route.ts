import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    const { label, imageUrl, categoryBanner } = await req.json();

    if (!userId) throw new Error("Unauthenticated");
    if (!label) throw new Error("Label must be provided");
    if (!imageUrl) throw new Error("Image URL must be provided");
    if (!categoryBanner) throw new Error("Category banner must be provided");

    const banner = await db.banner.create({
      data: {
        label,
        imageUrl,
        categoryBanner,
      },
    });

    return NextResponse.json(banner);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function GET(
  req: Request,
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    if (!userId) throw new Error("Unauthenticated");

    const banner = await db.banner.findMany();

    return NextResponse.json(banner);
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
