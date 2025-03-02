"use client";

import { useParams, usePathname } from "next/navigation";
import StoreSwicher from "./admin/store/store-switcher";
import { Store } from "@prisma/client";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function NavBottom({ items }: { items: Store[] }) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      label: "Banners",
      href: `/admin/store/${params.storeid}/banners`,
      active: pathname === `/admin/store/${params.storeid}/banners`,
    },
  ];
  return (
    <nav className="bg-gray-800 w-full flex items-center gap-8">
      <StoreSwicher items={items} />
      {routes.map((route) => (
        <Link
          href={route.href}
          key={route.label}
          className={cn(
            route.active ? "font-bold" : "font-light",
            "px-4 py-2 text-white hover:text-secondary"
          )}
        >
          <p className="text-sm ">{route.label}</p>
        </Link>
      ))}
    </nav>
  );
}
