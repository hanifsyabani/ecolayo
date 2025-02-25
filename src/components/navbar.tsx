import Image from "next/image";
import NavBottom from "./nav-bottom";
import { UserButton } from "@clerk/nextjs";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import db from "@/lib/db";

interface NavProps {
  store_name: string;
}

export default async function Navbar({ store_name }: NavProps) {

  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const stores = await db.store.findMany({
    where: {
      userId,
    },
  });
  return (
    <>
      <nav className="py-2 px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            src={"/logo.png"}
            width={100}
            height={100}
            alt="logo"
            className="w-10"
          />
          <h1 className="text-xl font-bold">{store_name}</h1>
        </div>
        <div className="flex items-center">
          <Input
            placeholder="Search here..."
            className="border border-primary w-[300px]"
          />
          <Button className="text-white">Search</Button>
        </div>
        <div>
          <UserButton />
        </div>
      </nav>
      <NavBottom items={stores} />
    </>
  );
}
