import Image from "next/image";
import NavBottom from "./nav-bottom";
  import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { Settings } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ButtonLogout from "./button-logout";

interface NavProps {
  store_name: string;
  store_id: string;
}

export default async function Navbar({ store_name, store_id }: NavProps) {
  const session = await getServerSession(authOptions)
  const userId  = session?.user.id

  if (!userId) redirect("/login");

  const stores = await db.store.findMany({
    where: {
      userId,
    },
  });

  
  return (
    <>
      <nav className="py-2 px-8 flex justify-between items-center">
        <Link href={`/admin/store/${store_id}`} className="flex items-center gap-2">
          <Image
            src={"/logo.png"}
            width={100}
            height={100}
            alt="logo"
            className="w-10"
          />
          <h1 className="text-xl font-bold">{store_name}</h1>
        </Link>
        <div className="flex items-center">
          <Input
            placeholder="Search here..."
            className="border border-primary w-[300px]"
          />
          <Button className="text-white">Search</Button>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/admin/store/${store_id}/settings`}>
            <Settings className="text-gray-800 cursor-pointer" />
          </Link>
          <ButtonLogout/>
        </div>
      </nav>
      <NavBottom items={stores} />
    </>
  );
}
