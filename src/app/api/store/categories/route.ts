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

    const { name, imageUrl } = await req.json();

    if (!name)
      return NextResponse.json(
        { error: "Name must be provided" },
        { status: 500 }
      );
    if (!imageUrl)
      return NextResponse.json(
        { error: "Banner id must be provided" },
        { status: 500 }
      );

    const category = await db.category.create({
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(category);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const category = await db.category.findMany({
      where: {
        isDeleted: false,
      },
    });

    return NextResponse.json(category);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
