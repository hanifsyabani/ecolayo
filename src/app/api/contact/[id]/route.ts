import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    console.log(params.id)

    if(!userId) return NextResponse.json({ error: "Unauthenticated" }, { status: 500 });

    const contactMessage = await db.contactMessage.delete({
      where: {
        id: params.id 
      }
    })

    return NextResponse.json(contactMessage);
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}