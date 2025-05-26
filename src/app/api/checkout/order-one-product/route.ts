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

    const { searchParams } = new URL(req.url);
    const idProduct = searchParams.get("id");

    if (!idProduct)
      return NextResponse.json(
        { error: "Product ID must be provided" },
        { status: 500 }
      );

    const orders = await db.checkout.findMany({
      where: {
        items: {
          some: {
            productId: idProduct,
          },
        },
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: true,
                tag: true,
                category: true,
              },
            },
          },
        },
        user: true
      },
    });

    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
