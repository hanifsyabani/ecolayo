import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { bannerid: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (!userId) return NextResponse.json({ error: "Unauthenticated" }, { status: 500 });

    if (!params.bannerid) return NextResponse.json({ error: "Banner ID must be provided" }, { status: 500 });

    const banner = await db.banner.findUnique({
      where: {
        id: params.bannerid,
      },
    });

    return NextResponse.json(banner);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { bannerid: string; storeid: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (!userId) return NextResponse.json({ error: "Unauthenticated" }, { status: 500 });

    const { label, imageUrl, categoryBanner } = await req.json();

    if (!label) return NextResponse.json({ error: "Label must be provided" }, { status: 500 });
    if (!imageUrl) return NextResponse.json({ error: "Image URL must be provided" }, { status: 500 });
    if (!categoryBanner) return NextResponse.json({ error: "Category banner must be provided" }, { status: 500 });

    let banner = await db.banner.findUnique({
      where: { id: params.bannerid },
    });

    if (!banner) {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 });
    }

    banner = await db.banner.update({
      where: {
        id: params.bannerid,
      },

      data: {
        label,
        imageUrl,
        categoryBanner
      },
    });

    return NextResponse.json({message: "Banner updated successfully"});
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { bannerid: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (!userId) return NextResponse.json({ error: "Unauthenticated" }, { status: 500 });

    const banner = await db.banner.findUnique({
      where: { id: params.bannerid },
    });

    if (!banner) {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 });
    }

    await db.banner.delete({
      where: {
        id: params.bannerid,
      },
    });

    return NextResponse.json({ message: "Banner deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
