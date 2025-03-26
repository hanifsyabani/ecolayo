import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 flex justify-center gap-8">
      <div>
        <Link href={`/`} className="flex items-center gap-2">
          <Image
            src={"/logo.png"}
            width={100}
            height={100}
            alt="logo"
            className="w-10"
          />
          <h1 className="text-xl font-bold">EcoLayo</h1>
        </Link>
        <p></p>
      </div>
    </footer>
  );
}
