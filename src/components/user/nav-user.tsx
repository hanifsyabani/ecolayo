import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Settings, ShoppingCart } from "lucide-react";
import ButtonLogout from "../button-logout";
import NavBottomUser from "./nav-bottom-user";
import Cart from "./cart";
import { SidebarTrigger } from "../ui/sidebar";

interface NavUserProps {
  category: Category[];
}
export default function NavUser({ category }: NavUserProps) {
  return (
    <nav >
      <div className="py-2 px-8 fixed w-full bg-white z-50 flex justify-between items-center">
        <Link href={`/admin/store/`} className="flex items-center gap-2">
          <Image
            src={"/logo.png"}
            width={100}
            height={100}
            alt="logo"
            className="w-10"
          />
          <h1 className="text-xl font-bold">Store</h1>
        </Link>
        <div className="flex items-center">
          <Input
            placeholder="Search here..."
            className="border border-primary w-[300px]"
          />
          <Button className="text-white">Search</Button>
        </div>
        <div className="flex items-center gap-6">
          <Link href={`/admin/store/settings`}>
            <Settings className="text-gray-800 cursor-pointer" />
          </Link>
          <SidebarTrigger />
          <ShoppingCart size={20} className="text-primary" />
          {/* <Cart /> */}
          <ButtonLogout />
        </div>
      </div>

      <NavBottomUser category={category} />
    </nav>
  );
}
