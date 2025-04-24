import CheckoutForm from "@/components/user/checkout/checkout-form";
import Image from "next/image";

export default function page() {
  return (
    <div className="py-4" >
      <Image
        src="/Breadcrumbs.png"
        alt="Breadcrumb"
        width={500}
        height={500}
        className="w-full"
      />

      <div className="mt-14">
        <CheckoutForm/>
      </div>
    </div>
  );
}
