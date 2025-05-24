"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Truck,
  Check,
  X,
  Clock,
  User,
  MapPin,
  Phone,
  CreditCard,
  Calendar,
  NotebookTabs,
} from "lucide-react";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import GetOrderById from "@/service/shop/checkout";
import Image from "next/image";
import OrderSummary from "./order-summary";
import OrderActions from "./order-actions";
import OrderTimeline from "./order-timeline";
import { Textarea } from "@/components/ui/textarea";

export default function OrderDetailProcess({ orderId }: { orderId: string }) {
  const router = useRouter();

  const { data: order, isLoading: isLoadingOrder, refetch } = useQuery({
    queryFn: () => GetOrderById(orderId),
    queryKey: ["dataOrder"],
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processing":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">
            <Clock className="h-3 w-3 mr-1" /> Processing
          </Badge>
        );
      case "on-the-way":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">
            <Truck className="h-3 w-3 mr-1" /> On The Way
          </Badge>
        );
      case "delivered":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <Check className="h-3 w-3 mr-1" /> Delivered
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-500 hover:bg-red-600">
            <X className="h-3 w-3 mr-1" /> Cancelled
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-500 hover:bg-gray-600">{status}</Badge>
        );
    }
  };

  if (isLoadingOrder) return <div className="spinner" />;

  return (
    <>
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.push('/admin/orders')}
              className="mr-4 hover:underline"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Button>
            <h1 className="text-2xl font-bold text-primary">
              Order #{order?.id.slice(0, 6)}
            </h1>
            <div className="ml-4 text-white">
              {getStatusBadge(order?.status)}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">
                      Order Details
                    </h2>
                    <p className="text-gray-500 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {format(new Date(order?.createdAt), "PPP 'at' p")}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-1 text-gray-500" />
                    <span className="text-gray-500">
                      {order?.paymentMethod}
                    </span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <h3 className="font-medium">Items</h3>

                  {order?.items.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-3 border-b last:border-0"
                    >
                      <div className="flex items-center">
                        <div className="h-16 w-16 rounded bg-gray-100 mr-4 overflow-hidden">
                          <Image
                            src={item.product.images[0].url}
                            alt={item.id}
                            className="h-full w-full object-cover"
                            width={100}
                            height={100}
                          />
                        </div>
                        <div>
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-medium">
                        {formatter.format(item.product.price)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Customer Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium flex items-center mb-2">
                      <User className="h-4 w-4 mr-2" />
                      Customer Details
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="font-medium">{order?.user.username}</p>
                      <p className="text-gray-600">{order?.user.email}</p>
                      <p className="text-gray-600 flex items-center mt-1">
                        <Phone className="h-3 w-3 mr-1" />
                        {order?.user.phone}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium flex items-center mb-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      Shipping Address
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p>{order?.shippingAddress.streetAddress}</p>
                      <p>
                        {order?.shippingAddress.province},{" "}
                        {order?.shippingAddress.kabupaten},{" "}
                        {order?.shippingAddress.kecamatan},{" "}
                        {order?.shippingAddress.kelurahan},
                        {order?.shippingAddress.postalCode}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium flex items-center mb-2">
                    <NotebookTabs className="h-4 w-4 mr-2" />
                    Notes from Customer
                  </h3>

                  <Textarea readOnly value={order?.orderNotes} className="border-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <OrderSummary order={order}  />
            <OrderActions order={order} refetch={refetch} />
            <OrderTimeline order={order} />
          </div>
        </div>
      </div>
    </>
  );
}
