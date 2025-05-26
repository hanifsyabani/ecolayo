import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    if (!userId)
      return NextResponse.json({ error: "Unauthenticated" }, { status: 500 });

    const shippingAddress = await db.shippingAddress.findFirst({
      where: {
        userId: userId,
      },
    });

    return NextResponse.json(shippingAddress);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

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
    } = await req.json();

    if(!firstName) return NextResponse.json({ error: "First name must be provided" }, { status: 500 });
    if(!lastName) return NextResponse.json({ error: "Last name must be provided" }, { status: 500 });
    if(!email) return NextResponse.json({ error: "Email must be provided" }, { status: 500 });
    if(!phone) return NextResponse.json({ error: "Phone must be provided" }, { status: 500 });
    if(!streetAddress) return NextResponse.json({ error: "Street address must be provided" }, { status: 500 });
    if(!province) return NextResponse.json({ error: "Province must be provided" }, { status: 500 });
    if(!kabupaten) return NextResponse.json({ error: "Kabupaten must be provided" }, { status: 500 });
    if(!kecamatan) return NextResponse.json({ error: "Kecamatan must be provided" }, { status: 500 });
    if(!kelurahan) return NextResponse.json({ error: "Kelurahan must be provided" }, { status: 500 });
    if(!postalCode) return NextResponse.json({ error: "Postal code must be provided" }, { status: 500 });
    

    const shippingAddress = await db.shippingAddress.create({
      data: {
        userId: userId,
        firstName,
        lastName,
        email,
        phone,
        companyName,
        streetAddress,
        province,
        kabupaten,
        kecamatan,
        kelurahan,
        postalCode,
      },
    });

    return NextResponse.json(shippingAddress);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function PATCH(req: Request) {
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
    } = await req.json();

    if(!firstName) return NextResponse.json({ error: "First name must be provided" }, { status: 500 });
    if(!lastName) return NextResponse.json({ error: "Last name must be provided" }, { status: 500 });
    if(!email) return NextResponse.json({ error: "Email must be provided" }, { status: 500 });
    if(!phone) return NextResponse.json({ error: "Phone must be provided" }, { status: 500 });
    if(!streetAddress) return NextResponse.json({ error: "Street address must be provided" }, { status: 500 });
    if(!province) return NextResponse.json({ error: "Province must be provided" }, { status: 500 });
    if(!kabupaten) return NextResponse.json({ error: "Kabupaten must be provided" }, { status: 500 });
    if(!kecamatan) return NextResponse.json({ error: "Kecamatan must be provided" }, { status: 500 });
    if(!kelurahan) return NextResponse.json({ error: "Kelurahan must be provided" }, { status: 500 });
    if(!postalCode) return NextResponse.json({ error: "Postal code must be provided" }, { status: 500 });
    

    const shippingAddress = await db.shippingAddress.update({
      where: {
        userId
      },
      data: {
        firstName,
        lastName,
        email,
        phone,
        companyName,
        streetAddress,
        province,
        kabupaten,
        kecamatan,
        kelurahan,
        postalCode,
      },
    });

    return NextResponse.json(shippingAddress);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}