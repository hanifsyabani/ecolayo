import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { categoryid: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const productid = searchParams.get("productid");

    if (!params.categoryid || !productid)
      return NextResponse.json(
        { error: "Category ID and Product ID must be provided" },
        { status: 500 }
      );

    const relatedProduct = await db.product.findMany({
      where: {
        categoryid: params.categoryid,
        id: {
          not: productid,
        },
        isDeleted: false,
      },
      include: {
        images: true,
        category: true,
        tag: true,
      },
    });

    return NextResponse.json(relatedProduct);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
