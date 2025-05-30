"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { dashboardUserItem } from "@/lib/item";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavigationSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar className="space-y-6 mt-40 bg-white h-56" side="left">
      <SidebarContent className="p-2">
        <h1 className="font-semibold">Navigation</h1>
        <SidebarGroup className="flex-1">
          <SidebarGroupContent className="space-y-2">
            {dashboardUserItem.map((item) => (
              <Link
                href={item.link}
                key={item.title}
                className={`flex items-center gap-3 group  hover:text-black  hover:bg-gray-200 text-base ${
                  item.link === pathname
                    ? "bg-gray-200 text-black"
                    : "text-gray-400"
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
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
