"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import {
  clearCart,
  deleteAllCartAsync,
  deleteCartAsync,
  fetchCartAsync,
} from "@/app/redux/cart-slice";
import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function SidebarCart() {
  const { cart, loading } = useSelector((state: RootState) => state.cart);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCartAsync());
  }, [dispatch]);

  const formatter = new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    style: "currency",
    currency: "IDR",
  });

  const totalPrice = cart?.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const itemCount = cart?.items.length || 0;

  async function handleRemoveItem(itemid: string) {
    setIsLoading(true);
    try {
      await dispatch(deleteCartAsync({ itemid })).unwrap();
      await dispatch(fetchCartAsync()).unwrap();
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleClearCart() {
    if (!cart?.id) return;

    try {
      await dispatch(deleteAllCartAsync());
      await dispatch(fetchCartAsync());
      toast.success("Cart cleared");
    } catch (error) {
      toast.error("Failed to clear cart");
    }
  }

  return (
    <>
      <Sidebar
        className="bg-white z-30 max-h-full overflow-x-hidden"
        side="right"
      >
        <SidebarContent className="pt-24 pb-4 w-full overflow-x-hidden bg-white">
          <SidebarGroup className="flex-1 flex flex-col overflow-x-hidden">
            <SidebarGroupLabel className="text-xl">
              Shopping Cart ({itemCount})
            </SidebarGroupLabel>

            {loading ? (
              <div className="flex-1 flex justify-center items-center">
                <p className="spinner" />
              </div>
            ) : itemCount === 0 ? (
              <div className="flex-1 text-gray-500 text-center flex justify-center items-center mt-4">
                Your cart is empty
              </div>
            ) : (
              <div className="space-y-8 my-5 flex-1  ">
                {cart?.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-4">
                      {item.product.images &&
                      item.product.images.length > 0 &&
                      item.product.images[0]?.url ? (
                        <Image
                          src={item.product.images[0].url}
                          width={100}
                          height={100}
                          alt={item.product.name || "Product image"}
                          className="w-20 h-20 object-cover"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded">
                          <span className="text-xs">No Image</span>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium">
                          {item.product.name}
                        </p>
                        <div className="flex items-center gap-2">
                          <p className="text-gray-500">{item.quantity} x </p>
                          <p className="text-sm">
                            {formatter.format(item.product.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleRemoveItem(item.id)}
                      className="cursor-pointer hover:bg-gray-200 bg-white border border-gray-200 p-1 rounded-full w-7 h-7"
                      disabled={isLoading}
                    >
                      <X size={30} />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {itemCount > 0 && (
              <div className="mt-auto pt-4 border-t">
                <div className="flex justify-between items-center text-sm mb-4">
                  <h1>
                    {itemCount} {itemCount === 1 ? "Product" : "Products"}
                  </h1>
                  <h1 className="font-medium">
                    {formatter.format(totalPrice || 0)}
                  </h1>
                </div>
                <Link href={"/shop/checkout"}>
                  <Button className="w-full bg-primary text-white py-1 rounded-full mb-2">
                    Checkout
                  </Button>
                </Link>
                <Link href="/shop/shop-cart" className="block mb-2">
                  <Button
                    variant="outline"
                    className="w-full border border-primary hover:bg-primary hover:text-white py-1 rounded-full"
                  >
                    Go to Cart
                  </Button>
                </Link>
                <Button
                  onClick={handleClearCart}
                  variant="destructive"
                  className="w-full hover:bg-red-700 bg-red-500 text-white py-1 rounded-full"
                >
                  Clear All
                </Button>
              </div>
            )}
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
