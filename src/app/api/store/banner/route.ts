import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (!userId)
      return NextResponse.json({ error: "Unauthenticated" }, { status: 500 });

    const { label, imageUrl, categoryBanner } = await req.json();

    if (!label)
      return NextResponse.json(
        { error: "Label must be provided" },
        { status: 500 }
      );
    if (!imageUrl)
      return NextResponse.json(
        { error: "Image URL must be provided" },
        { status: 500 }
      );
    if (!categoryBanner)
      return NextResponse.json(
        { error: "Category banner must be provided" },
        { status: 500 }
      );

    const banner = await db.banner.create({
      data: {
        label,
        imageUrl,
        categoryBanner
      },
    });

    return NextResponse.json(banner);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {

    const banner = await db.banner.findMany({
      where: {
        isDeleted: false  
      }
    });

    return NextResponse.json(banner);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
