import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { productid: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (!userId)
      return NextResponse.json({ error: "Unauthenticated" }, { status: 500 });

    const { isLiked } = await req.json();

    if (typeof isLiked !== "boolean") {
      return NextResponse.json(
        { error: "IsLiked must be a boolean" },
        { status: 400 }
      );
    }

    // jika true maka buat ke daftar suka, jika false maka hapus dari daftar suka
    if (isLiked) {
      await db.likedProduct.create({
        data: {
          userId,
          productId: params.productid,
        },
      });
    } else {
      await db.likedProduct.deleteMany({
        where: {
          userId,
          productId: params.productid,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { productid: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    const product = await db.product.findUnique({
      where: {
        id: params.productid,
      },
      include: {
        images: true,
        tag: true,
        category: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    let isLike = false;
    if (userId) {
      const liked = await db.likedProduct.findFirst({
        where: {
          userId,
          productId: product.id,
        },
      });
      // true jika liked adalah objek (artinya user pernah like)
      // false jika liked adalah null
      isLike = !!liked;
    }

    // isLike bakal nimpa yg di product.
    return NextResponse.json({ ...product, isLike });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
