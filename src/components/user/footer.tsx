import { footerLinks } from "@/lib/item";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "../ui/separator";

export default function Footer() {
  return (
    <footer className="bg-gray-900 px-10 py-4">
      <div className="lg:flex flex-row justify-evenly gap-8">
        <div className="space-y-4">
          <Link href={`/`} className="flex items-center gap-2">
            <Image
              src={"/logo.png"}
              width={100}
              height={100}
              alt="logo"
              className="w-10"
            />
            <h1 className="text-xl font-bold text-white">EcoLayo</h1>
          </Link>
          <p className="text-sm text-gray-500 max-w-sm">
            An eco-friendly supermarket offering fresh, organic, and
            high-quality food for a healthy & sustainable lifestyle.
          </p>
          <p className="underline mt-4 text-sm text-white underline-offset-8 decoration-green-600">
            ecoLayo@gmail.com
          </p>
        </div>

        <div className="lg:flex flex-row justify-center gap-x-20 space-y-4">
          {footerLinks.map((item) => (
            <div className="space-y-4" key={item.title}>
              <h5 className="text-white font-semibold">{item.title}</h5>
              <ul className="space-y-2 ">
                {item.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-gray-400 hover:text-white transition"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <Separator className="mt-8 bg-gray-300"/>

      <div>
        <span className="text-sm text-gray-500">EcoLayo eCommerce &copy; 2025. All rights reserved</span>
      </div>
    </footer>
  );
}
