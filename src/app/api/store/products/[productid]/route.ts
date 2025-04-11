import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { productid: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (!userId)
      return NextResponse.json({ error: "Unauthenticated" }, { status: 500 });

    if (!params.productid)
      return NextResponse.json(
        { error: "Product ID must be provided" },
        { status: 500 }
      );

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

    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { productid: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (!userId)
      return NextResponse.json({ error: "Unauthenticated" }, { status: 500 });

    const {
      name,
      price,
      images,
      categoryid,
      isFeatured,
      isArchived,
      stars,
      stock,
      shortDescription,
      description,
      tag,
    } = await req.json();

    if (!name)
      return NextResponse.json(
        { error: "Name must be provided" },
        { status: 400 }
      );
    if (!categoryid)
      return NextResponse.json(
        { error: "Category ID must be provided" },
        { status: 400 }
      );
    if (!price)
      return NextResponse.json(
        { error: "Price must be provided" },
        { status: 400 }
      );
    if (!images || images.length === 0)
      return NextResponse.json(
        { error: "Images must be provided" },
        { status: 400 }
      );
    if (!tag)
      return NextResponse.json(
        { error: "Tag must be provided" },
        { status: 400 }
      );
    if (!description)
      return NextResponse.json(
        { error: "Description must be provided" },
        { status: 400 }
      );
    if (!shortDescription)
      return NextResponse.json(
        { error: "Short Description must be provided" },
        { status: 400 }
      );
    if (!stars)
      return NextResponse.json(
        { error: "Rating must be provided" },
        { status: 400 }
      );

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
        stars,
        shortDescription,
        stock,
        description,
        tag: {
          set: [],
          connectOrCreate: tag.map((tagName: string) => ({
            where: { name: tagName },
            create: { name: tagName },
          })),
        },
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productid: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (!userId) return NextResponse.json({ error: "Unauthenticated" }, { status: 500 });

    const product = await db.product.delete({
      where: {
        id: params.productid,
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
