"use client";

import { Card, CardContent } from "@/components/ui/card";
import { formatter } from "@/lib/utils";
import GetOrderById from "@/service/shop/checkout";
import { GetUserProfile } from "@/service/shop/dashboard-user";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Link from "next/link";
import TrackingOrder from "./tracking-order";
import TableOrderProduct from "./table-order-product";
import Newsletter from "../../products/newsletter";

export default function OrderDetail({ id }: { id: string }) {
  const { data: order, isLoading: isLoadingOrder } = useQuery({
    queryFn: () => GetOrderById(id),
    queryKey: ["dataOrder"],
  });

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryFn: () => GetUserProfile(),
    queryKey: ["dataUser"],
  });

  const fullName = user?.firstName && user?.lastName
  ? user.firstName + " " + user.lastName
  : "-";


  const shippAddress =
    order?.streetAddress +
    ", " +
    order?.province +
    ", " +
    order?.kabupaten +
    ", " +
    order?.kecamatan +
    ", " +
    order?.kelurahan +
    ", " +
    order?.postalCode;

  if (isLoadingOrder || isLoadingUser) return <div className="spinner" />;

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-lg">Order Detail</h1>&bull;
          <p className="text-gray-500 text-sm">
            {format(order?.createdAt, "dd MMMM yyyy")}
          </p>
          &bull;
          <p className="text-gray-500 text-sm">{order?.items.length} Product</p>
        </div>
        <Link
          href={`/shop/dashboard/orders`}
          className="text-primary hover:underline"
        >
          Back to List
        </Link>
      </div>

      <div className="flex items-center gap-4 mt-8 ">
        <div className="w-[60%] flex items-center">
          <Card className="w-1/2 p-4 h-80">
            <CardContent className="text-sm">
              <h1 className="text-gray-500">Billing Address</h1>
              <div className="space-y-2">
                <h1>{fullName}</h1>
                <p className="text-sm text-gray-500">{user?.address ?? "-"}</p>
              </div>
              <div className="mt-8">
                <h1 className="text-gray-500 text-sm">Email</h1>
                <p>{user?.email}</p>
              </div>
              <div>
                <h1 className="text-gray-500 mt-4 text-sm">Phone</h1>
                <p>{user?.phone ?? "-"}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="w-1/2 p-4 h-80 ">
            <CardContent className="text-sm">
              <h1 className="text-gray-500">Shipping Address</h1>
              <div className="space-y-2">
                <h1>{order?.firstName + " " + order?.lastName}</h1>
                <p className="text-sm text-gray-500">{shippAddress}</p>
              </div>
              <div className="mt-8">
                <h1 className="text-gray-500 text-sm">Email</h1>
                <p>{user?.email}</p>
              </div>
              <div>
                <h1 className="text-gray-500 mt-4 text-sm">Phone</h1>
                <p>{user?.phone ?? "-"}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="w-[40%] py-1 h-80">
          <CardContent>
            <div className="flex justify-center items-center ">
              <div>
                <h1 className="text-gray-500 text-sm">Order ID: </h1>
                <small>{order?.id}</small>
              </div>
              <div>
                <h1 className="text-gray-500 text-sm">Payment Method: </h1>
                <small>{order?.paymentMethod}</small>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h1 className="text-gray-500 text-sm">Subtotal</h1>
                <small>{formatter.format(order?.subtotal)}</small>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="text-gray-500 text-sm">Tax</h1>
                <small>{formatter.format(order?.tax)}</small>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="text-gray-500 text-sm">Discount</h1>
                <small>
                  {order?.discount === 0 || null
                    ? "-"
                    : formatter.format(order?.discount)}
                </small>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="text-gray-500 text-sm">Shipping</h1>
                <small>{formatter.format(order?.shipping)}</small>
              </div>
            </div>

            <div className="flex justify-between items-center mt-5 text-lg">
              <h1>Total</h1>
              <small className="text-secondary font-semibold ">
                {formatter.format(order?.finalTotal)}
              </small>
            </div>
          </CardContent>
        </Card>
      </div>

      <TrackingOrder data={order} />
      <TableOrderProduct data={order}/>
      <Newsletter isSosmed={false}/>
    </>
  );
}
