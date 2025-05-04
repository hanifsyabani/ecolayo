import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { create } from "domain";
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

    const order = await db.checkout.create({
      data: {
        userId,
        orderNotes,
        paymentMethod,
        shippingAddressId :"1",
        items: {
          create: items.map((item: any) => ({
            quantity: item.quantity,
            productId: item.productId,
          })),
        },
        subtotal,
        finalTotal,
        shipping,
        tax,
      },
    });

    return NextResponse.json({
      message: "Order created successfully",
      orderId: order.id,
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
