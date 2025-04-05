"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface CartTotalProps {
  subtotal: number;
}

const strukItem = ["Subtotal", "Shipping", "Tax", "Total"];
export default function CartTotal({ subtotal }: CartTotalProps) {
  const router = useRouter();
  const formatter = new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    style: "currency",
    currency: "IDR",
  });
  const shippingCost = subtotal >= 100000 ? 0 : 5000;
  const tax = subtotal * (12 / 100);
  const finalTotal = subtotal + shippingCost + tax;

  return (
    <Card>
      <CardContent className="p-4">
        <h1 className="text-lg font-semibold">Cart Total</h1>
        <div className="flex justify-between items-center mt-2">
          <div className="space-y-4 text-left">
            {strukItem.map((item) => (
              <p key={item} className="text-sm text-gray-500">
                {item}
              </p>
            ))}
          </div>
          <div className="space-y-4 text-right">
            <p className="text-sm  ">{formatter.format(subtotal)}</p>
            {subtotal === 0 ? (
              <p className="text-sm">Free</p>
            ) : (
              <p className="text-sm  ">{formatter.format(shippingCost)}</p>
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

        <div className="flex justify-center mt-4">
          <Button
            className="text-white"
            disabled={subtotal === 0}
            onClick={() => router.push("/shop/checkout")}
          >
            Proceed to Checkout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
