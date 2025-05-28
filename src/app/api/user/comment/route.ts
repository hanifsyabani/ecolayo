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

    const {
      content,
      ratingProduct,
      photoProof,
      shopRating,
      courierRating,
      courierService,
      displayUsername,
    } = await req.json();

    const searchParams = new URL(req.url).searchParams;
    const orderId = searchParams.get("orderId");
    const productId = searchParams.get("productId");

    if (!content)
      return NextResponse.json(
        { error: "Content must be provided" },
        { status: 500 }
      );
    if (!ratingProduct)
      return NextResponse.json(
        { error: "Rating must be provided" },
        { status: 500 }
      );
    if (!shopRating)
      return NextResponse.json(
        { error: "Shop rating must be provided" },
        { status: 500 }
      );
    if (!courierRating)
      return NextResponse.json(
        { error: "Courier rating must be provided" },
        { status: 500 }
      );
    if (!courierService)
      return NextResponse.json(
        { error: "Courier service must be provided" },
        { status: 500 }
      );
    if (!displayUsername)
      return NextResponse.json(
        { error: "Display username must be provided" },
        { status: 500 }
      );
    if (!orderId)
      return NextResponse.json(
        { error: "Order id must be provided" },
        { status: 500 }
      );
    if(!productId)
      return NextResponse.json(
        { error: "Product id must be provided" },
        { status: 500 }
      );

    const review = await db.productReview.create({
      data: {
        userId,
        productId,
        content,
        ratingProduct,
        photoProof,
        shopRating,
        courierRating,
        courierService,
        displayUsername,
        orderId,
      },
    });

    return NextResponse.json(review);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
