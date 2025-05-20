import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatter } from "@/lib/utils";
import { Checkout } from "@prisma/client";

interface Order{
  order : Checkout
}

export default function OrderSummary({ order }: Order) {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>{formatter.format(order?.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span>{formatter.format(order?.shipping ?? 0)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span>{formatter.format(order?.tax)}</span>
          </div>

          <Separator className="my-2" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>{formatter.format(order?.finalTotal)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
