import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (!userId)
      return NextResponse.json({ error: "Unauthenticated" }, { status: 500 });

    const users = await db.user.findMany();

    if (!users)
      return NextResponse.json({ error: "No users found" }, { status: 500 });

    return NextResponse.json(users);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
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
      gender
    } = await req.json();

    if (!username) throw new Error("Name must be provided");

    if (!email) throw new Error("Email must be provided");
    const userEmail = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (userEmail)
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

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        status,
        role,
        imageUrl: imageUrl || "",
        firstName,
        lastName,
        address,
        phone,
        gender
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
