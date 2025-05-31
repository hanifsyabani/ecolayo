import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    if (!userId)
      return NextResponse.json({ error: "Unauthenticated" }, { status: 500 });

    const searchParams = new URL(req.url).searchParams;
    const productId = searchParams.get("productId");

    if (!productId)
      return NextResponse.json(
        { error: "Product ID must be provided" },
        { status: 500 }
      );

    const reviews = await db.productReview.findMany({
      where: {
        productId: productId,
      },
      include: {
        user: true,
        product: {
          include: {
            images: true,
            tag: true,
            category: true,
          },
        },
      },
    });

    return NextResponse.json(reviews);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
