"use client";

import { Category } from "@prisma/client";
import { useParams, usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";

interface NavUserProps {
  category: Category[];
}

export default function NavBottomUser({ category }: NavUserProps) {
  const pathname = usePathname();
  const params = useParams();
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      if (scrollTop > lastScrollY) {
        setScrolled(true);
      } else  {
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
      href: `/admin/store/${params.storeid}/categories`,
      active: pathname === `/admin/store/${params.storeid}/categories`,
    },
    {
      label: "Shop",
      href: `/admin/store/${params.storeid}/products`,
      active: pathname === `/admin/store/${params.storeid}/products`,
    },
    {
      label: "About Us",
      href: `/admin/store/${params.storeid}/products`,
      active: pathname === `/admin/store/${params.storeid}/products`,
    },
    {
      label: "Contact",
      href: `/admin/store/${params.storeid}/products`,
      active: pathname === `/admin/store/${params.storeid}/products`,
    },
  ];
  return (
    <nav
      className={`bg-gray-800 z-10 mt-14 w-full flex items-center gap-8 transition-transform duration-300 fixed py-2 px-3 ${
        scrolled ? "-translate-y-full" : "translate-y-0"
      } `}
    >
      <div>
        <Select>
          <SelectTrigger className="text-white border-none">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {category.map((item) => (
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
      </div>
      {routeUser.map((route) => (
        <div key={route.label}>
          <p className="text-white text-sm hover:text-primary cursor-pointer">
            {route.label}
          </p>
        </div>
      ))}
    </nav>
  );
}
