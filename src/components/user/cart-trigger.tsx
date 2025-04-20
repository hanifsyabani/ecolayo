"use client";

import { SidebarTrigger } from "../ui/sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";


export default function CartTrigger() {
  const { cart } = useSelector((state: RootState) => state.cart);
  const itemCount = cart?.items?.length || 0;

  return (
    <div className="flex relative">
      <SidebarTrigger />
      {itemCount > 0 && (
        <div className="w-5 h-5 -right-4 -top-2 bg-primary rounded-full absolute flex justify-center items-center text-white text-xs">
          {itemCount}
        </div>
      )}
    </div>
  );
}