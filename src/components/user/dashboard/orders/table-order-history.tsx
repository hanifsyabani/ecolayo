"use client";

import { useQuery } from "@tanstack/react-query";
import { CheckoutColumn, Columns } from "./column-order-history";
import { DataTable } from "@/components/ui/data-table";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";
import { GetOrders } from "@/service/shop/checkout";

export default function TableOrderHistory() {
  const { data: orders, isLoading: isLoadingCheckout } = useQuery({
    queryFn: () => GetOrders(),
    queryKey: ["dataCheckout"],
  });

  const formattedOrder: CheckoutColumn[] = orders?.map((checkout: any) => ({
    id:checkout.id,
    date: format(checkout.createdAt, "dd MMMM yyyy"),
    total: formatter.format(checkout.subtotal),
    status: checkout.status,
  }));

  if (isLoadingCheckout) return <div className="spinner"></div>;

  return (
    <div>
      <DataTable data={formattedOrder} columns={Columns()} searchKey="id" />
    </div>
  );
}
