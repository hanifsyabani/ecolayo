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

    const { name, bannerid } = await req.json();

    if (!userId) throw new Error("Unauthenticated");
    if (!name) throw new Error("Name must be provided");
    if (!bannerid) throw new Error("Image URL must be provided");

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeid,
        userId,
      },
    });

    if (!storeByUserId) throw new Error("Store not found");

    const category = await db.category.create({
      data: {
        name,
        bannerid,
        storeid: params.storeid,
      },
    });

    return NextResponse.json(category);
  } catch (error: any) {
    console.log("error category: ",error);
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

    // console.log("user id", userId);
    if (!userId) throw new Error("Unauthenticated");

    const category = await db.category.findMany({
      where: {
        storeid: params.storeid,
      },
      include: {
        banner: true,
      }
    });

    return NextResponse.json(category);
  } catch (error: any) {
    console.log(error);
    console.log(error.message);
    throw new Error(error);
  }
}
