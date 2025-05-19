"use client";

import Image from "next/image";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import NavBottomUser from "./nav-bottom-user";
import CartTrigger from "./cart-trigger";
import NavTopUser from "./nav-top-user";
import { FaRegUserCircle } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { GetStore } from "@/service/admin/store";

export default function NavUser() {

  const {data: store, isLoading: isLoadingStore} = useQuery({
    queryFn: () => GetStore(),
    queryKey: ["dataStore"],
  })

  if(isLoadingStore) return <div className='spinner'/>
  return (
    <nav>
      <div className="fixed w-full bg-white z-40">
        <NavTopUser />
        <div className="py-2 px-8 flex justify-between items-center">
          <Link href={`/`} className="flex items-center gap-2">
            <Image
              src={"/logo.png"}
              width={100}
              height={100}
              alt="logo"
              className="w-10"
            />
            <h1 className="text-xl font-bold">{store.store_name}</h1>
          </Link>
          <div className="flex items-center">
            <Input
              placeholder="Search here..."
              className="border border-primary w-[300px]"
            />
            <Button className="text-white">Search</Button>
          </div>
          <div className="flex  gap-8">
            <Link href={`/shop/wishlist`}>
              <Heart
                size={20}
                className="text-gray-800  hover:text-primary cursor-pointer"
              />
            </Link>

            <CartTrigger />
            <Link href={"/shop/dashboard"}>
              <FaRegUserCircle
                size={20}
                className="text-gray-800  hover:text-primary cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </div>

      <NavBottomUser />
    </nav>
  );
}
