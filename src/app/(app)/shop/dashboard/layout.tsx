import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { FaHeart, FaHistory, FaCartArrowDown } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mt-20 px-4">
      <div className="flex gap-10">
        <Card className="basis-1/4">
          <CardContent className="bg-white p-4">
            <h1 className="font-semibold">Navigation</h1>
            <div className="space-y-6 mt-2">
              <Link
                href={"/shop/dashboard"}
                className="flex items-center gap-2 group text-gray-400 py-2 hover:bg-gray-100 text-base hover"
              >
                <div className="w-1 h-5 bg-white group-hover:bg-primary"></div>
                <div className="flex items-center gap-1">
                  <MdDashboard size={20} />
                  Dashboard
                </div>
              </Link>
              <Link
                href={"/shop/dashboard"}
                className="flex items-center gap-2 text-gray-400 text-base"
              >
                <FaHistory size={20} />
                Order History
              </Link>
              <Link
                href={"/shop/dashboard"}
                className="flex items-center gap-2 text-gray-400 text-base"
              >
                <FaHeart size={20} />
                Wishlist
              </Link>
              <Link
                href={"/shop/dashboard"}
                className="flex items-center gap-2 text-gray-400 text-base"
              >
                <FaCartArrowDown size={20} />
                Shopping Cart
              </Link>
              <Link
                href={"/shop/dashboard/setting"}
                className="flex items-center gap-2 text-gray-400 text-base"
              >
                <IoIosSettings size={20} />
                Settings
              </Link>
            </div>
          </CardContent>
        </Card>
        <div>{children}</div>
      </div>
    </section>
  );
}
