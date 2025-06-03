import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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
      stock,
    } = await req.json();

    if (!userId)
      return NextResponse.json({ error: "Unauthenticated" }, { status: 500 });
    if (!name)
      return NextResponse.json(
        { error: "Name must be provided" },
        { status: 500 }
      );
    if (!stars)
      return NextResponse.json(
        { error: "Rating must be provided" },
        { status: 500 }
      );
    if (!categoryid)
      return NextResponse.json(
        { error: "Category ID must be provided" },
        { status: 500 }
      );
    if (!price)
      return NextResponse.json(
        { error: "Price must be provided" },
        { status: 500 }
      );
    if (!images || !images.length)
      return NextResponse.json(
        { error: "Images must be provided" },
        { status: 500 }
      );
    if (!tag)
      return NextResponse.json(
        { error: "Tag must be provided" },
        { status: 500 }
      );
    if (!description)
      return NextResponse.json(
        { error: "Description must be provided" },
        { status: 500 }
      );
    if (!stock)
      return NextResponse.json(
        { error: "Stock must be provided" },
        { status: 500 }
      );
    if (!shortDescription)
      return NextResponse.json(
        { error: "Short description must be provided" },
        { status: 500 }
      );

    const product = await db.product.create({
      data: {
        name,
        price,
        categoryid,
        isFeatured,
        isArchived,
        stock,
        stars,
        description,
        shortDescription,
        tag: {
          connectOrCreate: tag.map((tagName: string) => ({
            where: { name: tagName },
            create: { name: tagName },
          })),
        },
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const product = await db.product.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        images: true,
        category: true,
        tag: true,
        // CheckoutItem: {
        //   include: {
        //     checkout :true
        //   }
        // }
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
