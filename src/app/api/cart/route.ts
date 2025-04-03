// /api/cart/route.ts
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, productId, quantity } = await req.json();

    if (!userId || !productId || !quantity) {
      return NextResponse.json(
        { error: "User ID, product ID and quantity are required" },
        { status: 400 }
      );
    }

    // Check if product exists and has stock
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let cart = await db.cart.findUnique({
      where: { userId },
      include: { items: true },
    });

    if (!cart) {
      cart = await db.cart.create({
        data: {
          userId,
        },
        include: { items: true },
      });
    }

    const existingCartItem = cart.items.find(
      (item) => item.productId === productId
    );

    if (existingCartItem) {
      await db.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
      });
    } else {
      await db.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });
    }

    const updatedCart = await db.cart.findUnique({
      where: { userId },
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
      },
    });

    return NextResponse.json(
      { message: "Product added to cart successfully", cart: updatedCart },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return NextResponse.json(
      { error: "Failed to add product to cart" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const cart = await db.cart.findUnique({
      where: {
        userId,
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
      },
    });

    if (!cart) {
      return NextResponse.json({ cart: { items: [] } }, { status: 200 });
    }

    return NextResponse.json({ cart }, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}
