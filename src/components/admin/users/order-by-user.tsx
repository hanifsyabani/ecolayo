"use client";

import { DataTable } from "@/components/ui/data-table";
import { CheckoutColumn, Columns } from "@/components/user/dashboard/orders/column-order-history";
import { formatter } from "@/lib/utils";
import { GetOrdersByUser } from "@/service/admin/users";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

export default function OrderByUser({ userid }: { userid: string }) {
  const { data: ordersbyuser, isLoading: isLoadingOrders } = useQuery({
    queryFn: () => GetOrdersByUser(userid),
    queryKey: ["dataOrderByUser"],
  });

  const formattedOrder: CheckoutColumn[] = ordersbyuser?.map(
    (checkout: any) => ({
      id: checkout.id,
      date: format(checkout.createdAt, "dd MMMM yyyy"),
      total: formatter.format(checkout.subtotal),
      status: checkout.status,
    })
  );

  if (isLoadingOrders) return <div className="spinner"></div>;
  return (
    <div>
      <h1 className="font-semibold mt-10">Orders</h1>
      <DataTable data={formattedOrder} columns={Columns()} searchKey="id" />
    </div>
  );
}
