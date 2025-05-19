"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Package,
  Truck,
  Check,
  X,
  Clock,
  Info,
  User,
  MapPin,
  Phone,
  CreditCard,
  Calendar,
} from "lucide-react";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
// Custom Timeline components since we don't have access to a pre-built Timeline component
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import GetOrderById from "@/service/shop/checkout";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function OrderDetailProcess({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const { data: order, isLoading: isLoadingOrder } = useQuery({
    queryFn: () => GetOrderById(orderId),
    queryKey: ["dataOrder"],
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-blue-500";
      case "on-the-way":
        return "bg-yellow-500";
      case "delivered":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

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
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Button>
            <h1 className="text-2xl font-bold text-primary">
              Order #{order?.id}
            </h1>
            <div className="ml-4 text-white">{getStatusBadge(order?.status)}</div>
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
                         {order?.shippingAddress.province}, {order?.shippingAddress.kabupaten}, {order?.shippingAddress.kecamatan}, {order?.shippingAddress.kelurahan},
                        {order?.shippingAddress.postalCode}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
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
                    <span>{formatter.format(order?.shipping)}</span>
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

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Actions</h2>

                <div className="space-y-3">
                    {order?.status === "placed" && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="w-full text-white">
                          <Truck className="h-4 w-4 mr-2 " />
                          Processing Order
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-white">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Mark Order as Processing
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This will update the order status to "on-the-way".
                            Add any shipping notes below (optional):
                            <Textarea
                              className="w-full mt-2 p-2 border rounded-md"
                              rows={3}
                              placeholder="Enter shipping details or tracking information..."
                            />
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction disabled={isUpdating}>
                            Confirm
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                  {order?.status === "processing" && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="w-full text-white">
                          <Truck className="h-4 w-4 mr-2 " />
                          Mark as Shipped
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-white">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Mark Order as Shipped
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This will update the order status to "on-the-way".
                            Add any shipping notes below (optional):
                            <Textarea
                              className="w-full mt-2 p-2 border rounded-md"
                              rows={3}
                              placeholder="Enter shipping details or tracking information..."
                            />
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction disabled={isUpdating}>
                            Confirm
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}

                  {order?.status === "on-the-way" && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="w-full text-white bg-green-600 hover:bg-green-700">
                          <Check className="h-4 w-4 mr-2" />
                          Mark as Delivered
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-white">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Mark Order as Delivered
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This will complete the order? and update the status
                            to "Delivered". Add any delivery notes below
                            (optional):
                            <Textarea
                              className="w-full mt-2 p-2 border rounded-md"
                              rows={3}
                              placeholder="Confirm delivery details..."
                            />
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction disabled={isUpdating}>
                            Confirm
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}

                  {order?.status !== "delivered" &&
                    order?.status !== "cancelled" && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full text-red-600 border-red-300 hover:bg-red-50 mt-2"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel Order
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Cancel Order</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to cancel this order?? This
                              action cannot be undone. Please provide a reason
                              for cancellation:
                              <Textarea
                                className="w-full mt-2 p-2 border rounded-md"
                                rows={3}
                                placeholder="Reason for cancellation..."
                                required
                              />
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>
                              No, keep order?
                            </AlertDialogCancel>
                            <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white">
                              Yes, cancel order?
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                </div>
              </CardContent>
            </Card>

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
                        order?.status !== "placed"
                          ? "bg-blue-500"
                          : "bg-gray-300"
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
                        order?.status === "on-the-way" ||
                        order?.status === "delivered"
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
                        {order?.status === "on-the-way" ||
                        order?.status === "delivered"
                          ? "Order has been shipped and is on the way."
                          : "Waiting for shipment..."}
                      </p>
                    </div>
                  </div>

                  <div className="relative pl-8">
                    <div
                      className={`absolute left-0 top-1 h-5 w-5 rounded-full ${
                        order?.status === "delivered"
                          ? "bg-green-500"
                          : "bg-gray-300"
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
          </div>
        </div>
      </div>
    </>
  );
}
