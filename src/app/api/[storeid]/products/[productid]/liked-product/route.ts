import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { productid: string; storeid: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (!userId) throw new Error("Unauthenticated");

    const {
      isLiked
    } = await req.json();

    if (typeof isLiked !== "boolean") {
      throw new Error("isLiked must be a boolean");
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
    console.log(error);
    throw new Error(error);
  }
}