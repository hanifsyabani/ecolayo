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
    if (!userId)
      return NextResponse.json({ error: "Unauthenticated" }, { status: 500 });

    if (!params.categoryid)
      return NextResponse.json(
        { error: "Category ID must be provided" },
        { status: 500 }
      );

    const product = await db.product.findMany({
      where: {
        categoryid: params.categoryid,
      },
      include: {
        images: true,
        category: true,
        tag: true,
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
