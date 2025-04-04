import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeid: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    // untuk filter
    // const { searchParams } = new URL(req.url);
    // const categoryid = searchParams.get("categoryid") || undefined;
    // const isFeatured = searchParams.get("isFeatured");

    if (!userId) throw new Error("Unauthenticated");

    const product = await db.product.findMany({
      where: {
        storeid: params.storeid,
        isLike: true
      },
      include: {
        images: true,
        category: true,
        tag: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.log(error);
    // console.log(error.message);
    throw new Error(error);
  }
}