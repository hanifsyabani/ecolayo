"use client";

import { dashboardUserItem } from "@/lib/item";
import { List } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function SidebarMobile() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = React.useState(false);

  return (
    <div className="lg:hidden mt-10 absolute left-4 ">
      <List size={20} onClick={() => setIsMobile(!isMobile)} />

      <div
        className={`absolute transition-all bg-white shadow-md w-52 p-4 z-50  ${
          isMobile ? "left-0" : "-left-[20rem]"
        }`}
      >
        {dashboardUserItem.map((item) => {
          const isActive =
            item.link === "/shop/dashboard"
              ? pathname === "/shop/dashboard"
              : pathname.startsWith(item.link);
          return (
            <Link
              href={item.link}
              key={item.title}
              className={`flex items-center gap-3 group  hover:text-black  hover:bg-gray-200 text-base ${
                isActive ? "bg-gray-200 text-black" : "text-gray-400"
              }`}
            >
              <div
                className={`w-1 h-5  group-hover:bg-primary ${
                  item.link === pathname ? "bg-primary" : "bg-white"
                } `}
              ></div>
              <div className="flex items-center gap-1 py-2">
                <item.icon size={20} />
                {item.title}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
