"use client";

import { useParams, usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GetCategories } from "@/service/categories";
import Link from "next/link";

export default function NavBottomUser() {
  const pathname = usePathname();
  const params = useParams();
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryFn: () => GetCategories(),
    queryKey: ["dataCategories"],
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      if (scrollTop > lastScrollY) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      setLastScrollY(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const routeUser = [
    {
      label: "Home",
      href: `/shop`,
      active: pathname === `/shop`,
    },
    {
      label: "Shop",
      href: `/shop/all-products`,
      active: pathname === `/shop/all-products`,
    },
    {
      label: "About Us",
      href: `/shop/about`,
      active: pathname === `/shop/about`,
    },
    {
      label: "Contact",
      href: `/shop/contact`,
      active: pathname === `/shop/contact`,
    },
  ];

  return (
    <nav
      className={`bg-gray-800 z-10 mt-24 w-full flex items-center gap-8 transition-transform duration-300 fixed py-2 px-3 ${
        scrolled ? "-translate-y-full" : "translate-y-0"
      } `}
    >
      <div>
        {isLoadingCategories ? (
          <p className="spinner"/>
        ) : (
          <Select>
            <SelectTrigger className="text-white border-none">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {categories.map((item: any) => (
                <SelectItem
                  value={item.id}
                  key={item.id}
                  className="hover:bg-primary hover:text-white cursor-pointer"
                >
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      {routeUser.map((route) => (
        <Link href={route.href} key={route.label}>
          <p
            className={`text-sm hover:text-primary cursor-pointer ${
              route.active ? "font-bold text-primary" : "text-white"
            }`}
          >
            {route.label}
          </p>
        </Link>
      ))}
    </nav>
  );
}
