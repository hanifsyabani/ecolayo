import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeid: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    const {
      name,
      price,
      images,
      categoryid,
      isFeatured,
      isArchived,
      stars,
      description,
      shortDescription,
      tag,
    } = await req.json();

    if (!userId) throw new Error("Unauthenticated");
    if (!name) throw new Error("Name must be provided");
    if (!stars) throw new Error("Stars must be provided");
    if (!categoryid) throw new Error("category must be provided");
    if (!price) throw new Error("Price must be provided");
    if (!images || !images.length) throw new Error("Images must be provided");
    if (!tag) throw new Error("Tag must be provided");
    if (!description) throw new Error("Description must be provided");
    if (!shortDescription)
      throw new Error("Short Description must be provided");

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeid,
        userId,
      },
    });

    if (!storeByUserId) throw new Error("Store not found");

    const product = await db.product.create({
      data: {
        name,
        price,
        categoryid,
        isFeatured,
        isArchived,
        stars,
        description,
        shortDescription,
        tag: {
          connectOrCreate: tag.map((tagName: string) => ({
            where: { name: tagName },
            create: { name: tagName },
          })),
        },
        storeid: params.storeid,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.log("Error detected:  ", error);
    throw new Error(error);
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeid: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    // untuk filter
    // const { searchParams } = new URL(req.url);
    // const categoryid = searchParams.get("categoryid") || undefined;
    // const isFeatured = searchParams.get("isFeatured");

    if (!userId) throw new Error("Unauthenticated");

    const product = await db.product.findMany({
      where: {
        storeid: params.storeid,
        // categoryid,
        // isFeatured: isFeatured ? true : undefined,
        // isArchived: false,
      },
      include: {
        images: true,
        category: true,
        tag:true
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.log(error);
    // console.log(error.message);
    throw new Error(error);
  }
}
