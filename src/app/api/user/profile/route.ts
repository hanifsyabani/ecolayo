import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {

    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    if(!userId) return NextResponse.json({ error: "Unauthenticated" }, { status: 500 });

    const user = await db.user.findFirst({
      where:{
        id: userId
      }
    })

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
