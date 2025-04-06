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
    if (!userId) throw new Error("Unauthenticated");

    if (!params.productid) throw new Error("Product ID must be provided");

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
    throw new Error(error);
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { productid: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (!userId) throw new Error("Unauthenticated");

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

    if (!name) throw new Error("Name must be provided");
    if (!categoryid) throw new Error("Image URL must be provided");
    if (!price) throw new Error("Price must be provided");
    if (!images || !images.length) throw new Error("Images must be provided");
    if (!tag) throw new Error("Tag must be provided");
    if (!description) throw new Error("Description must be provided");
    if (!shortDescription)
      throw new Error("Short Description must be provided");
    if (!stars) throw new Error("Rating must be provided");


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
    throw new Error(error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productid: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (!userId) throw new Error("Unauthenticated");

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

