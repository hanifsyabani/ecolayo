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

    const user = await db.user.findFirst({
      where: {
        id: userId,
      },
    });

    return NextResponse.json(user);
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

    const { firstName, lastName, email, phone, imageUrl } = await req.json();

    // if(!firstName) return NextResponse.json({ error: "First name must be provided" }, { status: 500 });
    // if(!lastName) return NextResponse.json({ error: "Last name must be provided" }, { status: 500 });
    // if(!email) return NextResponse.json({ error: "Email must be provided" }, { status: 500 });
    // if(!phone) return NextResponse.json({ error: "Phone must be provided" }, { status: 500 });
    // if(!imageUrl) return NextResponse.json({ error: "Image url must be provided" }, { status: 500 });

    const user = await db.user.update({
      where: {
        id: userId,
      },
      data:{
        firstName,
        lastName,
        email,
        phone,
        imageUrl
      }
    });

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
