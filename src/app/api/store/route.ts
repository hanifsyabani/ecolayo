import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // const authData = await auth()
    // console.log(authData)
    const session =await getServerSession ();

    const { name } = await req.json();

    if (!session?.user.id) throw new Error("Unauthenticated");
    if(!name) throw new Error("Name must be provided");

    const store = await db.store.create({
      data: {
        name,
        userId: session.user.id,
      },
    });

    return NextResponse.json(store);
  } catch (error: any) {
    throw new Error(error);
  }
}
