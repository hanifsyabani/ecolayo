import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    if (!userId)
      return NextResponse.json({ error: "Unauthenticated" }, { status: 500 });

    const { email, subject, message } = await req.json();

    if (!email)
      return NextResponse.json(
        { error: "Email must be provided" },
        { status: 500 }
      );
    if (!subject)
      return NextResponse.json(
        { error: "Subject must be provided" },
        { status: 500 }
      );
    if (!message)
      return NextResponse.json(
        { error: "Message must be provided" },
        { status: 500 }
      );

    const contactMessage = await db.contactMessage.create({
      data: {
        userId,
        email,
        message,
        subject,
      },
    });

    return NextResponse.json(contactMessage);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const feedback = await db.contactMessage.findMany({
      include: {
        user: true,
      },
    });

    return NextResponse.json(feedback);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    if (!userId)
      return NextResponse.json({ error: "Unauthenticated" }, { status: 500 });

    const { id } = await req.json();

    if (!id)
      return NextResponse.json(
        { error: "Id must be provided" },
        { status: 500 }
      );

    const feedback = await db.contactMessage.update({
      where: {
        id,
      },
      data: {
        status: "resolved",
      },
    });
    return NextResponse.json(feedback);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
