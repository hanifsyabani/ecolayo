"use client";

import { DataTable } from "@/components/ui/data-table";
import { Columns, ShopCartColumn } from "./columns-shopping-cart";
import Coupon from "./coupon";
import CartTotal from "./cart-total";
import Newsletter from "../products/newsletter";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useEffect, useState } from "react";
import {
  deleteCartAsync,
  fetchCartAsync,
  updateCartAsync,
} from "@/app/redux/cart-slice";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ShoppingCart() {
  const { cart, loading } = useSelector((state: RootState) => state.cart);
  const [isLoading, setIsLoading] = useState(false);
  const [cartUpdates, setCartUpdates] = useState<Record<string, number>>({});

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCartAsync());
  }, [dispatch]);

  const formatter = new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    style: "currency",
    currency: "IDR",
  });

  const shopCartData: ShopCartColumn[] = (cart?.items ?? []).map((item) => ({
    id: item.id,
    name: item.product.name,
    price: item.product.price,
    images: item.product.images || [],
    quantity:
      cartUpdates[item.id] !== undefined
        ? cartUpdates[item.id]
        : item.quantity,
    totalPrice: formatter.format(
      item.product.price *
        (cartUpdates[item.id] !== undefined
          ? cartUpdates[item.id]
          : item.quantity)
    ),
  }));


  function handleQuantityChange(id: string, quantity: number) {
    setCartUpdates((prev) => ({
      ...prev,
      [id]: quantity,
    }));
  }

  async function handleUpdateCart() {
    setIsLoading(true);
    try {
      const updatePromises = Object.entries(cartUpdates).map(
        ([id, quantity]) => {
          return dispatch(
            updateCartAsync({
              id,
              quantity,
            })
          ).unwrap();
        }
      );

      await Promise.all(updatePromises);

      setCartUpdates({});
      toast.success("Cart updated successfully");
      // .unwrap() dipakai untuk:
      // Mengakses hasil asli dari async thunk
      // Menangkap error pakai try/catch
      // Bikin penanganan error lebih fleksibel dan seperti async/await biasa
      await dispatch(fetchCartAsync()).unwrap();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error updating cart"
      );
    } finally {
      setIsLoading(false);
    }
  }

  const totalPrice = shopCartData.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // console.log(cart);
  return (
    <>
      <div className="flex px-8 py-10 justify-center gap-6">
        <div className="w-[70%]">
          <div>
            <DataTable
              columns={Columns(handleQuantityChange)}
              data={shopCartData}
            />
            <div className="flex justify-between items-center">
              <Link href={"/shop"}>
                <Button className="bg-gray-300 text-xs">Return to Shop</Button>
              </Link>
              <Button
                className="bg-gray-300 text-xs"
                onClick={handleUpdateCart}
                disabled={isLoading || Object.keys(cartUpdates).length === 0}
              >
                {isLoading ? "Updating..." : "Update Cart"}
              </Button>
            </div>
          </div>

          <Coupon />
        </div>
        <div className="w-[30%]">
          <CartTotal subtotal={totalPrice} />
        </div>
      </div>
      <Newsletter isSosmed={true} />
    </>
  );
}
