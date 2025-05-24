"use client";

import { Card, CardContent } from "@/components/ui/card";
import { formatter } from "@/lib/utils";
import { GetUserProfile } from "@/service/shop/dashboard-user";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Image from "next/image";
import { CheckoutColumn, Columns } from "./orders/column-order-history";
import Link from "next/link";
import { DataTable } from "@/components/ui/data-table";
import { GetAllOrdersOneUser } from "@/service/shop/checkout";

export default function Profile() {
  const { data: userProfile, isLoading: isLoadingProfile } = useQuery({
    queryFn: () => GetUserProfile(),
    queryKey: ["dataUser"],
  });

  const { data: orders, isLoading: isLoadingOrder } = useQuery({
    queryFn: () => GetAllOrdersOneUser(),
    queryKey: ["dataCheckout"],
  });

  const formattedOrder: CheckoutColumn[] = orders?.map((checkout: any) => ({
    id: checkout.id,
    date: format(checkout.createdAt, "dd MMMM yyyy"),
    total: formatter.format(checkout.subtotal),
    status: checkout.status,
  }));

  if (isLoadingProfile || isLoadingOrder)
    return <div className="spinner"></div>;
  return (
    <>
      <div className="flex justify-center items-center gap-8">
        <Card className="w-1/2 p-4 h-60">
          <CardContent className="space-y-4 text-center">
            <div className="flex justify-center">
              {userProfile.imageUrl ? (
                <Image
                  src={userProfile.imageUrl}
                  alt="profileImg"
                  width={200}
                  height={200}
                  className="rounded-full w-20 h-20-center"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
              )}
            </div>

            <div>
              <h1 className="font-semibold">{userProfile.username}</h1>
              <small className="text-gray-500">Customer</small>
            </div>
            <h1 className="hover:underline text-primary">Edit Profile</h1>
          </CardContent>
        </Card>
        <Card className="w-1/2 p-4 h-60">
          <CardContent className="space-y-4">
            <h1 className="font-semibold">Billing Address</h1>
            <div className="space-y-2">
              <h1>
                {userProfile.firstName + " " + userProfile.lastName}
              </h1>
              <p className="text-gray-500 text-sm">{userProfile.address}</p>
              <p>{userProfile.email}</p>
              <p>{userProfile.phone}</p>
            </div>
            <h1 className="hover:underline text-primary cursor-pointer">Edit Address</h1>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold">Recent Order History</h1>
          <Link
            href={"/shop/dashboard/orders"}
            className="hover:underline text-primary"
          >
            View All
          </Link>
        </div>

        <DataTable data={formattedOrder} columns={Columns()} searchKey="date"  />
      </div>
    </>
  );
}
