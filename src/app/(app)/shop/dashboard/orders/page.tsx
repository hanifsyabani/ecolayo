import TableOrderHistory from "@/components/user/dashboard/orders/table-order-history";

export default function page() {
  return (
    <section>
      <h1 className="font-semibold">Order History</h1>
      <div>
        <TableOrderHistory />
      </div>
    </section>
  );
}
