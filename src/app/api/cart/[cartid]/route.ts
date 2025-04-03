// /api/cart/item/[id]/route.ts
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { cartid: string } }
) {
  try {
    const cartItemId = params.cartid;

    if (!cartItemId) {
      return NextResponse.json(
        { error: "Cart item ID is required" },
        { status: 400 }
      );
    }

    const cartItem = await db.cartItem.findUnique({
      where: { id: cartItemId },
    });

    if (!cartItem) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    await db.cartItem.delete({
      where: {
         id: cartItemId 
      },
    });

    return NextResponse.json(
      { message: "Cart item removed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing cart item:", error);
    return NextResponse.json(
      { error: "Failed to remove cart item" },
      { status: 500 }
    );
  }
}
