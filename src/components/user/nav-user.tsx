'use client'

import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import ButtonLogout from "../button-logout";
import NavBottomUser from "./nav-bottom-user";
import CartTrigger from "./cart-trigger";
import { useEffect, useState } from "react";
import NavTopUser from "./nav-top-user";

export default function NavUser() {
  const [category, setCategory] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "/api/af990241-e9fd-458c-9612-47ea908df21f/categories"
        );
        const data = await response.json();
        setCategory(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <nav>
      <div className="fixed w-full bg-white z-50">
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
            <Link href={`/shop/wishlist`}>
              <Heart size={20} className="text-gray-800 cursor-pointer" />
            </Link>

            <CartTrigger />
          </div>
        </div>
      </div>

      <NavBottomUser category={category} />
    </nav>
  );
}
