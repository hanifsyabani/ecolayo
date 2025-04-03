"use client";

import { DataTable } from "@/components/ui/data-table";
import { Columns, ShopCartColumn } from "./columns-shopping-cart";
import Coupon from "./coupon";
import CartTotal from "./cart-total";
import Newsletter from "../products/newsletter";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { fetchCartAsync } from "@/app/redux/cart-slice";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

export default function ShoppingCart() {
  const { cart, loading } = useSelector((state: RootState) => state.cart);

  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.id) {
      dispatch(fetchCartAsync(session.user.id));
    }
  }, [dispatch, session?.user?.id]);

  const formatter = new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    style: "currency",
    currency: "IDR",
  });

  const shopCartData: ShopCartColumn[] = (cart?.items ?? []).map((item) => ({
    name: item.product.name,
    price: Number(item.product.price),
    images: item.product.images || [],
    quantity: item.quantity,
    totalPrice: formatter.format(item.product.price * item.quantity),
  }));

  // console.log(shopCartData);
  // console.log(cart)

  if (loading) return <div className="spinner"></div>;

  return (
    <>
      <div className="flex px-8 py-10 justify-center gap-6">
        <div className="w-[70%]">
          <DataTable columns={Columns} data={shopCartData} />
          <Coupon />
        </div>
        <div className="w-[30%]">
          <CartTotal />
        </div>
      </div>
      <Newsletter isSosmed={true} />
    </>
  );
}
