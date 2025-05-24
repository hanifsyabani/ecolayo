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
      firstName,
      lastName,
      companyName,
      streetAddress,
      province,
      kabupaten,
      kecamatan,
      kelurahan,
      postalCode,
      email,
      phone,
      orderNotes,
      paymentMethod,
      items,
      subtotal,
      shipping,
      tax,
      finalTotal,
    } = await req.json();

    if (!firstName)
      return NextResponse.json(
        { error: "First name is required" },
        { status: 500 }
      );
    if (!lastName)
      return NextResponse.json(
        { error: "Last name is required" },
        { status: 500 }
      );
    if (!streetAddress)
      return NextResponse.json(
        { error: "Street address is required" },
        { status: 500 }
      );
    if (!province)
      return NextResponse.json(
        { error: "Province is required" },
        { status: 500 }
      );
    if (!kabupaten)
      return NextResponse.json(
        { error: "Kabupaten is required" },
        { status: 500 }
      );
    if (!kecamatan)
      return NextResponse.json(
        { error: "Kecamatan is required" },
        { status: 500 }
      );
    if (!kelurahan)
      return NextResponse.json(
        { error: "Kelurahan is required" },
        { status: 500 }
      );
    if (!postalCode)
      return NextResponse.json(
        { error: "Postal code is required" },
        { status: 500 }
      );
    if (!email)
      return NextResponse.json({ error: "Email is required" }, { status: 500 });
    if (!phone)
      return NextResponse.json({ error: "Phone is required" }, { status: 500 });
    if (!paymentMethod)
      return NextResponse.json(
        { error: "Payment method is required" },
        { status: 500 }
      );
    if (!items)
      return NextResponse.json(
        { error: "Items are required" },
        { status: 500 }
      );
    if (!subtotal)
      return NextResponse.json(
        { error: "Subtotal is required" },
        { status: 500 }
      );
    if (!tax)
      return NextResponse.json({ error: "Tax is required" }, { status: 500 });

    const shippingAddress = await db.shipppingAddress.findFirst({
      where: {
        userId,
      },
    });
    if (!shippingAddress)
      return NextResponse.json(
        { error: "Shipping address not found" },
        { status: 500 }
      );

    // transaction untuk memastikan atomicity
    const result = await db.$transaction(async (prisma) => {
      const order = await prisma.checkout.create({
        data: {
          userId,
          orderNotes: orderNotes || "",
          paymentMethod,
          shippingAddressId: shippingAddress.id,
          items: {
            create: items.map((item: any) => ({
              quantity: item.quantity,
              productId: item.productId,
            })),
          },
          subtotal,
          finalTotal,
          shipping: shipping || 0,
          tax,
        },
      });

      // Update totalCheckout dan totalQuantitySold untuk setiap product
      for (const item of items) {
        await prisma.product.update({
          where: {
            id: item.productId,
          },
          data: {
            totalCheckout: {
              increment: 1, 
            },
            totalQuantitySold: {
              increment: item.quantity, 
            },
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      return order;
    });

    return NextResponse.json({
      message: "Order created successfully",
      orderId: result.id,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    if (!userId)
      return NextResponse.json({ error: "Unauthenticated" }, { status: 500 });

    const orders = await db.checkout.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
