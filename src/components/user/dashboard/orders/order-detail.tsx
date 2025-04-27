"use client";

import GetOrderById from "@/service/shop/checkout";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Link from "next/link";

export default function OrderDetail({ id }: { id: string }) {
  const { data: order, isLoading: isLoadingOrder } = useQuery({
    queryFn: () => GetOrderById(id),
    queryKey: ["dataOrder"],
  });

  if(isLoadingOrder) return <div className="spinner"/>

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-lg">Order Detail</h1>&bull;
          <p className="text-gray-500">{format(order?.createdAt, "dd MMMM yyyy")}</p>&bull;
          <p className="text-gray-500">{order?.items.length} Product</p>
        </div>
        <Link href={`/shop/dashboard/orders`} className="text-primary hover:underline">Back to List</Link>
      </div>
    </div>
  );
}
