import db from "@/lib/db";
import { auth} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeid: string } }
) {
  try {
    const { userId } = await auth();

    const { name,price, images, categoryid,isFeatured, isArchived} = await req.json();

    if (!userId) throw new Error("Unauthenticated");
    if (!name) throw new Error("Name must be provided");
    if (!categoryid) throw new Error("Image URL must be provided");
    if(!price) throw new Error("Price must be provided");


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
        storeid: params.storeid,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        }
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeid: string } }
) {
  try {
    const { userId } = await auth();
    // const user = await currentUser()

    console.log("user id", userId);
    if (!userId) throw new Error("Unauthenticated");

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeid,
        userId,
      },
    });

    if (!storeByUserId) throw new Error("Store not found");

    const product = await db.product.findMany({
      where: {
        storeid: params.storeid,
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.log(error);
    console.log(error.message);
    throw new Error(error);
  }
}
