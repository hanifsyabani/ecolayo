import OrderDetailProcess from "@/components/admin/orders/order-detail-process";

export default function page({ params }: { params: { id: string } }) {
  return (
    <>
      <OrderDetailProcess orderId={params.id} />
    </>
  )
}
