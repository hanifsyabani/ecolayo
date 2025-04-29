"use client";

import { Columns, OrderProductColumn } from "./column-order-product";
import { formatter } from "@/lib/utils";
import { DataTable } from "@/components/ui/data-table";
import { Checkout } from "@prisma/client";



export default function TableOrderProduct({data}:any) {

  console.log(data)

  const formattedOrderProduct: OrderProductColumn[] =
    data?.items.map((product: any) => ({
      name: product?.product.name || "No product name",
      images:
        product?.product.images?.[0]?.url || "/placeholder.png",
      price: formatter.format(product?.product.price || 0),
      quantity: product?.quantity || 0,
      total: formatter.format(data.subtotal|| 0),
    })) || [];

  return (
    <div>
      <DataTable
        data={formattedOrderProduct}
        columns={Columns()}
        searchKey="name"
      />
    </div>
  );
}
