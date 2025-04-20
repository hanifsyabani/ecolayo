import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    if (!userId) return NextResponse.json({ error: "Unauthenticated" }, { status: 500 });

    const product = await db.likedProduct.findMany({
      where:{
        userId : userId
      },
      include:{
        product: {
          include:{
            images: true,
            tag: true,
            category: true
          }
        }
      }
    })


    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}