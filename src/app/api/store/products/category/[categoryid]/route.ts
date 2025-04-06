import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { categoryid: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (!userId) throw new Error("Unauthenticated");

    if (!params.categoryid) throw new Error("Category ID must be provided");

    const product = await db.product.findMany({
      where: {
        categoryid: params.categoryid,
      },
      include: {
        images: true,
        category: true,
        tag:true
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    throw new Error(error);
  }
}