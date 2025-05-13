import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FaHome } from "react-icons/fa";
import ContactView from "@/components/user/contact/page";

export default function page() {
  return (
    <div className="py-4">
      <Breadcrumb className="mt-4 px-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <FaHome />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/shop/contact" className="text-primary">
              Contact
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div >
        <ContactView />
      </div>
    </div>
  );
}
