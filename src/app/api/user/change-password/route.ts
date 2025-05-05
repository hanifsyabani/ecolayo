import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    if (!userId)
      return NextResponse.json({ error: "Unauthenticated" }, { status: 500 });

    const { currentPassword, newPassword, confirmPassword } = await req.json();

    if (!currentPassword)
      return NextResponse.json(
        { error: "Old password must be provided" },
        { status: 500 }
      );
    if (!newPassword)
      return NextResponse.json(
        { error: "New password must be provided" },
        { status: 500 }
      );
    if(!confirmPassword) {
      return NextResponse.json(
        { error: "Confirm password must be provided" },
        { status: 500 }
      );
    }

    if(newPassword !== confirmPassword){
      return NextResponse.json(
        { error: "New password and confirm password must be same" },
        { status: 500 }
      );
    }

    const user = await db.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 500 });
    const passwordMatch = await bcrypt.compare(currentPassword, user.password)
    if(!passwordMatch){
      return NextResponse.json(
        { error: "Old password is incorrect" },
        { status: 500 }
      );
    }
  
    const updateUser = await db.user.update({
      where:{
        id:userId
      },
      data:{
        password: newPassword
      }
    })

    return NextResponse.json(updateUser);
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
