import { Card, CardContent } from "@/components/ui/card";
import { Checkout } from "@prisma/client";
import { format } from "date-fns";
import { Check, Clock, Package, Truck, X } from "lucide-react";

interface Order {
  order: Checkout;
}


export default function OrderTimeline({order} : Order) {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Order Timeline</h2>

        <div className="space-y-6">
          <div className="relative pl-8">
            <div className="absolute left-0 top-1 h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
              <Package className="h-3 w-3 text-white" />
            </div>
            <div className="absolute left-2 top-6 bottom-0 w-0.5 bg-gray-200"></div>
            <div>
              <h3 className="font-medium">Order Placed</h3>
              <p className="text-sm text-gray-500">
                {format(new Date(order.createdAt), "PPP 'at' p")}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Order #{order?.id} was received and is being processed.
              </p>
            </div>
          </div>

          <div className="relative pl-8">
            <div
              className={`absolute left-0 top-1 h-5 w-5 rounded-full ${
                order?.status !== "placed" ? "bg-blue-500" : "bg-gray-300"
              } flex items-center justify-center`}
            >
              <Clock className="h-3 w-3 text-white" />
            </div>
            <div className="absolute left-2 top-6 bottom-0 w-0.5 bg-gray-200"></div>
            <div>
              <h3 className="font-medium">Processing</h3>
              {order?.status !== "placed" && (
                <p className="text-sm text-gray-500"></p>
              )}
              <p className="text-sm text-gray-600 mt-1">
                {order?.status !== "placed"
                  ? "Order is being processed and prepared for shipping."
                  : "Waiting for processing..."}
              </p>
            </div>
          </div>

          <div className="relative pl-8">
            <div
              className={`absolute left-0 top-1 h-5 w-5 rounded-full ${
                order?.status === "on-the-way" || order?.status === "delivered"
                  ? "bg-yellow-500"
                  : "bg-gray-300"
              } flex items-center justify-center`}
            >
              <Truck className="h-3 w-3 text-white" />
            </div>
            <div className="absolute left-2 top-6 bottom-0 w-0.5 bg-gray-200"></div>
            <div>
              <h3 className="font-medium">on-the-way</h3>
              {(order?.status === "on-the-way" ||
                order?.status === "delivered") && (
                <p className="text-sm text-gray-500">
                  {format(new Date(), "PPP 'at' p")}
                </p>
              )}
              <p className="text-sm text-gray-600 mt-1">
                {order?.status === "on-the-way" || order?.status === "delivered"
                  ? "Order has been shipped and is on the way."
                  : "Waiting for shipment..."}
              </p>
            </div>
          </div>

          <div className="relative pl-8">
            <div
              className={`absolute left-0 top-1 h-5 w-5 rounded-full ${
                order?.status === "delivered" ? "bg-green-500" : "bg-gray-300"
              } flex items-center justify-center`}
            >
              <Check className="h-3 w-3 text-white" />
            </div>
            <div>
              <h3 className="font-medium">Delivered</h3>
              {order?.status === "delivered" && (
                <p className="text-sm text-gray-500">
                  {format(new Date(), "PPP 'at' p")}
                </p>
              )}
              <p className="text-sm text-gray-600 mt-1">
                {order?.status === "delivered"
                  ? "Order has been delivered successfully."
                  : "Waiting for delivery..."}
              </p>
            </div>
          </div>
        </div>
        {order?.status === "cancelled" && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center text-red-600">
              <X className="h-5 w-5 mr-2" />
              <span className="font-medium">Order Cancelled</span>
            </div>
            <p className="mt-1 text-sm text-gray-600 pl-7">
              This order? was cancelled. Reason: {"No reason provided."}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
