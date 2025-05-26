import { DataTable } from "@/components/ui/data-table";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";
import { OrdersColumn, Columns } from "../orders/column-all-orders";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, Truck, X } from "lucide-react";

interface OrderHistoryProps {
  data: any;
}
export default function CheckoutHistory({ data }: OrderHistoryProps) {
  const formattedOrder: OrdersColumn[] = data?.map((checkout: any) => ({
    id: checkout.id,
    customer: checkout.user.username,
    date: format(checkout.createdAt, "dd MMMM yyyy"),
    total: formatter.format(checkout.subtotal),
    status: checkout.status,
  }));

  return (
    <>
      <DataTable data={formattedOrder} columns={Columns()} />
    </>
  );
}
