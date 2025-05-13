"use client";

import React, { useState } from "react";
import BillingInfo from "./billing-info";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatter } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { PostCheckout } from "@/service/shop/checkout";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const strukItem = ["Subtotal", "Shipping", "Tax", "Total"];
const paymentMethod = ["Direct Bank Transfer", "Cash on Delivery", "Qris"];

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  companyName: z.string().optional(),
  streetAddress: z.string().min(1),
  province: z.string().min(1),
  kabupaten: z.string().min(1),
  kecamatan: z.string().min(1),
  kelurahan: z.string().min(1),
  postalCode: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  orderNotes: z.string().optional(),
  paymentMethod: z.string().min(1),
});
type FormFields = z.infer<typeof schema>;

export default function CheckoutForm() {
  const { cart, loading } = useSelector((state: RootState) => state.cart);
  const [isLoading, setIsLoading] = useState(false);
  const subtotal =
    cart?.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    ) ?? 0;

  const shippingCost = subtotal >= 100000 ? 0 : 5000;
  const tax = subtotal * (12 / 100);
  const finalTotal = subtotal + shippingCost + tax;
  const router = useRouter() 

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });
  

  const { mutate: placeOrder } = useMutation({
    mutationFn: (
      // & menggabungkan dua tipe data menjadi satu artinya data itu objek kemudian ditambah dengan properti items.
      data: FormFields & {
        items: {
          // cartId : string
          productId: string;
          quantity: number;
        }[];
        subtotal: number;
        finalTotal: number;
        shipping: number;
        tax: number;
      }
    ) => PostCheckout(data),
    onSuccess: () => {
      setIsLoading(false);
      toast.success("Order placed successfully");
      router.push("/shop/dashboard/orders");
    },
    onError: (error: any) => {
      setIsLoading(false);
      const message = error?.error || error?.message || "";
      console.log(message);
      toast.error("Error checkout");
    },
  });

  async function onSubmit(data: FormFields) {
    setIsLoading(true);
    const checkoutData = {
      ...data,
      items:
        cart?.items.map((item) => ({
          quantity: item.quantity,
          productId: item.product.id,
        })) || [],
      shipping: shippingCost,
      tax,
      subtotal : subtotal,
      finalTotal: finalTotal,
    };
    placeOrder(checkoutData);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex px-8 gap-10">
        <div className="w-[60%]">
          <div>
            <h1 className="text-xl font-semibold mb-4">Shipping Information</h1>
            <BillingInfo
              register={register}
              setValue={setValue}
              errors={errors}
            />
          </div>
          <div className="mt-10">
            <h1 className="text-xl font-semibold mb-4">Additional Info</h1>
            <div>
              <Label>Order notes(optional)</Label>
              <Textarea
                rows={5}
                placeholder="Notes about your order, e.g. special notes for delivery"
                {...register("orderNotes")}
              />
              {errors.orderNotes && (
                <p className="text-sm text-red-500">
                  {errors.orderNotes.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="w-[40%]">
          <Card>
            <CardContent className="bg-white p-4">
              <h1 className="text-xl font-semibold mb-4">Order Summary</h1>

              <div>
                {cart?.items.map((product) => (
                  <div
                    className="flex items-center justify-between "
                    key={product.id}
                  >
                    <div className="flex items-center">
                      <Image
                        src={product.product.images[0].url}
                        alt="productcart"
                        width={100}
                        height={100}
                      />
                      <h1>
                        {product.product.name} (x{product.quantity})
                      </h1>
                    </div>
                    <span>
                      {formatter.format(
                        product.product.price * product.quantity
                      )}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="space-y-4 text-left">
                  {strukItem.map((item) => (
                    <p key={item} className="text-sm text-gray-500">
                      {item}
                    </p>
                  ))}
                </div>
                <div className="space-y-4 text-right">
                  <p className="text-sm">{formatter.format(subtotal)}</p>
                  {subtotal === 0 ? (
                    <p className="text-sm">Free</p>
                  ) : (
                    <p className="text-sm  ">
                      {formatter.format(shippingCost)}
                    </p>
                  )}
                  <p className="text-sm  ">{formatter.format(tax)} (PPN 12%)</p>
                  {subtotal === 0 ? (
                    <p className="text-sm">0</p>
                  ) : (
                    <p className="text-sm  font-semibold ">
                      {formatter.format(finalTotal)}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <h1 className="text-xl font-semibold mb-3">Payment Method</h1>
                {paymentMethod.map((method) => (
                  <div className="flex gap-2 items-center mb-2" key={method}>
                    <Input
                      type="radio"
                      value={method}
                      {...register("paymentMethod")}
                      id={method}
                      className="w-4 h-4"
                    />
                    <Label htmlFor={method} className="text-sm cursor-pointer">
                      {method}
                    </Label>
                  </div>
                ))}
                {errors.paymentMethod && (
                  <p className="text-sm text-red-500">
                    {errors.paymentMethod.message}
                  </p>
                )}
              </div>

              <div className="mt-8 text-white">
                <Button className="w-full  rounded-full" disabled={isLoading}>
                  {isLoading ? <span className="spinner" /> : "Place Order"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
