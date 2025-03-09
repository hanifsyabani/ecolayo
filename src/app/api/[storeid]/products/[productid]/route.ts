import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { productid: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthenticated");

    if (!params.productid) throw new Error("Product ID must be provided");

    const product = await db.product.findUnique({
      where: {
        id: params.productid,
      },
      include: {
        images: true,
        category: true,
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { productid: string; storeid: string } }
) {
  try {
    const session = await getServerSession();
    const userId = session?.user.id;
    if (!userId) throw new Error("Unauthenticated");

    const { name, price, images, categoryid, isFeatured, isArchived } =
      await req.json();

    if (!name) throw new Error("Name must be provided");
    if (!categoryid) throw new Error("Image URL must be provided");
    if (!price) throw new Error("Price must be provided");
    if (!images || !images.length) throw new Error("Images must be provided");

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeid,
        userId,
      },
    });

    if (!storeByUserId) throw new Error("Store not found");

    await db.product.update({
      where: {
        id: params.productid,
      },

      data: {
        name,
        price,
        images: {
          deleteMany: {},
        },
        categoryid,
        isFeatured,
        isArchived,
      },
    });

    const product = await db.product.update({
      where: {
        id: params.productid,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeid: string; productid: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthenticated");

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeid,
        userId,
      },
    });

    if (!storeByUserId) throw new Error("Store not found");

    const product = await db.product.delete({
      where: {
        id: params.productid,
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    throw new Error(error);
  }
}
