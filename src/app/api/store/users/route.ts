import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(){
  try {
    const session  = await getServerSession(authOptions)
    const userId = session?.user.id
    if (!userId) throw new Error("Unauthenticated");

    const users = await db.user.findMany();

    if(!users) throw new Error("User not found");

    return NextResponse.json(users);
  } catch (error:any) {
    throw new Error(error);
  }
}

export async function POST(req: Request){
  try {

    const session  = await getServerSession(authOptions)
    const userId = session?.user.id
    if (!userId) throw new Error("Unauthenticated");

    const {name, email, password, status, role, imageUrl} = await req.json();

    if(!name) throw new Error("Name must be provided");

    if(!email) throw new Error("Email must be provided");
    const userEmail = await db.user.findUnique({
      where: {
        email
      }
    })

    if(userEmail) throw new Error("Email already exists");


    if(!password) throw new Error("Password must be provided");
    if(!status) throw new Error("Status must be provided");
    if(!role) throw new Error("Role must be provided");



    const user = await db.user.create({
      data: {
        name,
        email,
        password,
        status,
        role,
        imageUrl
      },
    })

    return NextResponse.json(user);
  } catch (error:any) {
    throw new Error(error);
  }
}