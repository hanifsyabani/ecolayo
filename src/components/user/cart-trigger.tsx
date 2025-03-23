'use client'

import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import {  useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

export default function CartTrigger() {
  const cart = useSelector((state: RootState) => state.cart.items);

  return (
    <div className="flex relative ">
      <SidebarTrigger  />
      {cart.length> 0 && <div className="w-3 h-3 -right-2 bg-primary rounded-full absolute flex justify-center items-center text-white text-xs">{cart.length}</div>  }
     
    </div>
  );
}
