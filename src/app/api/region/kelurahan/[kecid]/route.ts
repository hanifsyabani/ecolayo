import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// app/api/provinces/route.ts
export async function GET(
  req: Request,
  { params }: { params: { kecid: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }


    const res = await fetch(
      `https://wilayah.id/api/villages/${params.kecid}.json`,
      {
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }

    const kelurahan = await res.json();

    return NextResponse.json(kelurahan);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
