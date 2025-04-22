import { NextResponse } from "next/server";

// app/api/provinces/route.ts
export async function GET() {
  try {
    const res = await fetch("https://wilayah.id/api/provinces.json", {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }

    const provinces = await res.json();

    return NextResponse.json(provinces);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
