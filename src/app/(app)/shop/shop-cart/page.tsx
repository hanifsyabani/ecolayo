import ShoppingCart from "@/components/user/shop-cart/shopping-cart";
import Image from "next/image";

export default function page() {
  return (
    <div className="w-full">
      <Image
        src="/Breadcrumbs.png"
        alt="Breadcrumb"
        width={500}
        height={500}
        className="w-full"
      />
      <div className="mt-14">
        <h1 className="text-center text-2xl font-semibold">My Shopping Cart</h1>
        <ShoppingCart/>
      </div>
    </div>
  );
}
