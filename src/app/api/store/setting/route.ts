import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (!userId) throw new Error("Unauthenticated");

    const { store_name, logo, phone, address } = await req.json();

    if (!store_name)
      return NextResponse.json(
        { error: "Store name must be provided" },
        { status: 500 }
      );
    if (!phone)
      return NextResponse.json(
        { error: "phone must be provided" },
        { status: 500 }
      );

    if (!address)
      return NextResponse.json(
        { error: "address must be provided" },
        { status: 500 }
      );

    const store = await db.store.update({
      where: {
        id: "1",
      },
      data: {
        store_name,
        logo,
        address,
        phone,
      },
    });

    return NextResponse.json(store);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (!userId) throw new Error("Unauthenticated");

    const store = await db.store.findMany();

    return NextResponse.json(store);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
