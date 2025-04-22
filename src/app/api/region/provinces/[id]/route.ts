import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// app/api/provinces/route.ts
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("provinsi: ", params.id);

    const res = await fetch(
      `https://wilayah.id/api/regencies/${params.id}.json`,
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

    const district = await res.json();

    return NextResponse.json(district);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
