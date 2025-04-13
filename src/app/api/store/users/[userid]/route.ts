import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { userid: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (!userId)
      return NextResponse.json({ error: "Unauthenticated" }, { status: 500 });

    const user = await db.user.findUnique({
      where: { id: params.userid },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { userid: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (!userId) throw new Error("Unauthenticated");

    const {
      username,
      email,
      password,
      status,
      role,
      imageUrl,
      firstName,
      lastName,
      address,
      phone,
    } = await req.json();

    if (!username) throw new Error("Name must be provided");

    if (!email) throw new Error("Email must be provided");
    const userEmail = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (userEmail && userEmail.id !== params.userid)
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 500 }
      );

    if (!password)
      return NextResponse.json(
        { error: "Password must be provided" },
        { status: 500 }
      );
    if (!status)
      return NextResponse.json(
        { error: "Status must be provided" },
        { status: 500 }
      );
    if (!role)
      return NextResponse.json(
        { error: "Role must be provided" },
        { status: 500 }
      );

    const user = await db.user.update({
      where: {
        id: params.userid,
      },
      data: {
        username,
        email,
        password,
        status,
        role,
        imageUrl,
        firstName,
        lastName,
        address,
        phone,
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { userid: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (!userId)
      return NextResponse.json({ error: "Unauthenticated" }, { status: 500 });

    const user = await db.user.update({
      where: {
        id: params.userid,
      },
      data:{
        isDeleted: true
      }
    });

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
