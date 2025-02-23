import Image from "next/image";
import NavBottom from "./nav-bottom";
import { UserButton } from "@clerk/nextjs";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface NavProps {
  store_name: string;
}

export default function Navbar({ store_name }: NavProps) {
  return (
    <>
      <nav className="py-2 flex justify-between items-center">
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
          <Input placeholder="Search here..." className="border border-primary w-[300px]"/>
          <Button className="text-white">Search</Button>
        </div>
        <div>
          <UserButton/>
        </div>
      </nav>
      <NavBottom/>
    </>
  );
}
