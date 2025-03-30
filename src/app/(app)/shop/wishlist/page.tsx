import TableWishlist from "@/components/user/wishlist/table-wishlist";
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
        <h1 className="text-center text-2xl font-semibold">My Wishlist</h1>
        <TableWishlist />
      </div>
    </div>
  );
}
