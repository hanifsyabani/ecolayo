'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from "../ui/sidebar";
import { Fullscreen, Home, Logs, Settings, ShoppingBasket, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ButtonLogout from "../button-logout";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { GetStore } from "@/service/store";


export default function SidebarAdmin() {
  const pathname = usePathname();

   const {
      data: store,
      isLoading: isLoadingStore,
      refetch,
    } = useQuery({
      queryFn: () => GetStore(),
      queryKey: ["dataStoreSidebar"],
    });
  
  const items = [
    {
      title: "Home",
      url: `/admin`,
      icon: Home,
      // active: pathname === "/",
    },
    {
      title: "Products",
      url: `/admin/products`,
      icon: ShoppingBasket,
      // active: pathname === `/admin/store/${params.storeid}/products`,
    },
    {
      title: "Banners",
      url: `/admin/banners`,
      icon: Fullscreen,
      // active: pathname === `/admin/store/${params.storeid}/banners`,
    },
    {
      title: "Categories",
      url: `/admin/categories`,
      icon: Logs,
    },
    {
      title: "Users",
      url: `/admin/users`,
      icon: Users,
    },
    {
      title: "Settings",
      url: `/admin/settings`,
      icon: Settings,
      // active: pathname === `/admin/store/${store_id}/settings`,
    },
  ];

  if(isLoadingStore) return <div className="spinner"></div>
  return (
    <Sidebar className="bg-white" side="left">
      <SidebarContent className="py-5 px-2 h-full">
        <Link
          href={`/admin/store`}
          className="flex items-center gap-2"
        >
          <Image
            src={store?.logo}
            width={100}
            height={100}
            alt="logo"
            className="w-10"
          />
          <h1 className="text-xl font-bold">{store?.store_name}</h1>
        </Link>

        <SidebarGroup className="flex-1">
          <SidebarGroupContent className="space-y-4">
            {items.map((item) => {
              const isActive = pathname === item.url;
              return(

              <Link
                href={item.url}
                key={item.title}
                className={`${
                  isActive ? "bg-primary text-white" : "bg-white hover:bg-gray-200"
                }  py-2 rounded-full px-3 cursor-pointer flex items-center gap-4`}
              >
                <item.icon size={25} />
                <span>{item.title}</span>
              </Link>
              )
            })}
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <ButtonLogout />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
