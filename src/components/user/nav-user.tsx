import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Settings} from "lucide-react";
import ButtonLogout from "../button-logout";
import NavBottomUser from "./nav-bottom-user";
import { SidebarTrigger } from "../ui/sidebar";
import CartTrigger from "./cart-trigger";

interface NavUserProps {
  category: Category[];
}
export default function NavUser({ category }: NavUserProps) {

  
  return (
    <nav>
      <div className="py-2 px-8 fixed w-full bg-white z-50 flex justify-between items-center">
        <Link href={`/`} className="flex items-center gap-2">
          <Image
            src={"/logo.png"}
            width={100}
            height={100}
            alt="logo"
            className="w-10"
          />
          <h1 className="text-xl font-bold">EcoLayo</h1>
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
         
          <CartTrigger/>
          <ButtonLogout />
        </div>
      </div>

      <NavBottomUser category={category} />
    </nav>
  );
}
