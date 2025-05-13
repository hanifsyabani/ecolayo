import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import AllProductsView from "@/components/user/all-products/all-products-view";
import Image from "next/image";
import { FaHome } from "react-icons/fa";

export default function page() {
  return (
    <div className="py-4 px-8">
      <Breadcrumb className="mt-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <FaHome />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/shop/all-products" className="text-primary">
              All Products
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="w-full mt-8">
        <Image
          src={"/discount.png"}
          width={500}
          height={500}
          alt="discount"
          className="w-full"
        />

        <AllProductsView />
      </div>
    </div>
  );
}
