import { DataTable } from "@/components/ui/data-table";
import { Columns } from "./columns-shopping-cart";
import Coupon from "./coupon";
import CartTotal from "./cart-total";
import Newsletter from "../products/newsletter";

export default function ShoppingCart() {
  
  return (
    <>
      <div className="flex px-8 py-10 justify-center gap-6">
        <div className="w-1/2">
          <DataTable columns={Columns} data={[]} />
          <Coupon />
        </div>
        <div className="w-1/2">
          <CartTotal />
        </div>
      </div>
      <Newsletter isSosmed={true} />
    </>
  );
}
