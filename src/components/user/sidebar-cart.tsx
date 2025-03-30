"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { clearCart, removeFromCart } from "@/app/redux/cart-slice";
import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

export function SidebarCart() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  function totalPrice() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  const formatter = new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    style: "currency",
    currency: "IDR",
  });

  return (
    <Sidebar className="bg-white " side="right">
      <SidebarContent className="pt-28">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl">
            Shopping Cart ({cart.length})
          </SidebarGroupLabel>
          {cart.length === 0 ? (
            <div className="text-gray-500 text-center flex justify-center items-center mt-4 ">
              Your cart is empty
            </div>
          ) : (
            <div className="space-y-8 my-5 ">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-4 ">
                    <Image
                      src={item.images[0].url}
                      width={100}
                      height={100}
                      alt="productimg"
                    />
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm ">{item.name}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-gray-500">{item.quantity} x </p>
                          <p className="text-sm">
                            {" "}
                            {formatter.format(item.quantity * item.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <X
                    size={30}
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="cursor-pointer hover:bg-gray-200 p-1 rounded-full"
                  />
                </div>
              ))}
            </div>
          )}
          {cart.length > 0 && (
            <>
              <div className="flex justify-between items-center text-sm">
                <h1>{cart.length} Product</h1>
                <h1>{formatter.format(totalPrice())}</h1>
              </div>
              <Button className="mt-3 w-full   text-white py-1 rounded-full">
                Checkout
              </Button>
              <Button
                onClick={() => dispatch(clearCart())}
                className="mt-3 w-full hover:bg-red-700 bg-red-500   text-white py-1 rounded-full"
              >
                Clear All
              </Button>
            </>
          )}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
