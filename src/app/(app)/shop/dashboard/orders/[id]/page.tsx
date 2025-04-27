import OrderDetail from "@/components/user/dashboard/orders/order-detail";

export default function page({ params }: { params: { id: string } }) {
  return (
    <section>
      <OrderDetail id={params.id} />
    </section>
  );
}
