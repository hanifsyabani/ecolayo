import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) redirect("/login");


  return (
    <>
      <nav className="py-2 px-3 flex gap-32 items-center bg-white">

        <div className="flex items-center justify-center">
          <Input
            placeholder="Search here..."
            className="border border-primary w-[300px]"
          />
          <Button className="text-white">Search</Button>
        </div>
        <div className="flex items-center gap-3"></div>
      </nav>
    </>
  );
}
