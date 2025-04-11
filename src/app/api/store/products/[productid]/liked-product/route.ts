import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { productid: string} }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (!userId) return NextResponse.json({ error: "Unauthenticated" }, { status: 500 });

    const {
      isLiked
    } = await req.json();

    if (typeof isLiked !== "boolean") {
      return NextResponse.json(
        { error: "isLiked must be a boolean" },
        { status: 400 }
      );
    }

    const product = await db.product.update({
      where: {
        id: params.productid,
        
      },

      data: {
        isLike: isLiked
      },
    });

 

    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}