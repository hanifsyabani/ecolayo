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
    if (!userId) throw new Error("Unauthenticated");

    if (!params.categoryid) throw new Error("Category ID must be provided");

    const category = await db.category.findUnique({
      where: {
        id: params.categoryid,
      },
    });

    return NextResponse.json(category);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { categoryid: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (!userId) return NextResponse.json({ error: "Unauthenticated" }, { status: 500 });

    const { name, imageUrl } = await req.json();

    if (!name) return NextResponse.json({ error: "Name must be provided" }, { status: 500 });
    if (!imageUrl) return NextResponse.json({ error: "Banner id must be provided" }, { status: 500 });


    const category = await db.category.update({
      where: {
        id: params.categoryid,
      },

      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(category);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: {  categoryid: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (!userId) throw new Error("Unauthenticated");

    await db.category.update({
      where: {
        id: params.categoryid,
      },
      data: {
        isDeleted: true
      }
    });
    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
