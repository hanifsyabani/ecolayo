"use client";

import {  usePathname } from "next/navigation";
import StoreSwicher from "./admin/store/store-switcher";
import { Store } from "@prisma/client";

export default function NavBottom({ items }: { items: Store[] }) {
  const pathname = usePathname();

  const routes = [
    {
      label: "Settings",
    },
  ];
  return (
    <nav className="bg-gray-800 w-full">
      <StoreSwicher items={items} />
    </nav>
  );
}
