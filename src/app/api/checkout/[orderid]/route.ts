import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { orderid: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    // console.log("order id: ", params.orderid);

    if (!userId)
      return NextResponse.json({ error: "Unauthenticated" }, { status: 500 });

    const orders = await db.checkout.findFirst({
      where: {
        id: params.orderid,
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
        shippingAddress: true,
        user: true,
      },
    });

    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function PATCH(req: Request, { params }: { params: { orderid: string } }) {
  try {

    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    if (!userId)
      return NextResponse.json({ error: "Unauthenticated" }, { status: 500 });

    const {status} = await req.json()

    // console.log("status: ", status);

    if(!status) return NextResponse.json({ error: "Status must be provided" }, { status: 500 });

    const order = await db.checkout.update({
      where: {
        id: params.orderid,
      },
      data: {
        status
      }
    })
    
    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
    
  }
}