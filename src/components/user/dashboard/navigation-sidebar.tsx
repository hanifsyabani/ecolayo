"use client";

import { dashboardUserItem } from "@/lib/item";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavigationSidebar() {
  const pathname = usePathname();
  return (
    <div className="space-y-6 mt-2">
      {dashboardUserItem.map((item) => (
        <Link
          href={item.link}
          key={item.title}
          className={`flex items-center gap-3 group  hover:text-black  hover:bg-gray-200 text-base ${
            item.link === pathname ? "bg-gray-200 text-black" : "text-gray-400"
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
      ))}
    </div>
  );
}
