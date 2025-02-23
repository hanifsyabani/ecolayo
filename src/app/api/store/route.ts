import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // const authData = await auth()
    // console.log(authData)
    const { userId } = await auth();

    const { name } = await req.json();

    if (!userId) throw new Error("Unauthenticated");
    if(!name) throw new Error("Name must be provided");

    const store = await db.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error: any) {
    throw new Error(error);
  }
}
