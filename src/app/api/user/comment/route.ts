import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    if (!userId) return NextResponse.json({ error: "Unauthenticated" }, { status: 500 });

    const {content, rating, productId} = await req.json()

    if(!content) return NextResponse.json({ error: "Content must be provided" }, { status: 500 });
    if(!rating) return NextResponse.json({ error: "Rating must be provided" }, { status: 500 });

    const comment = await db.comments.create({
      data:{
        userId,
        content,
        rating,
        productId
      }
    })

    return NextResponse.json(comment);
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}