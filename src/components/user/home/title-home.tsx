import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface TitleHomeProps {
  title: string;
  link: string;
}

export default function TitleHome({ title, link }: TitleHomeProps) {
  return (
    <div className="flex justify-between items-center px-4">
      <div className="flex items-center gap-3">
        <div className="w-1 h-5 bg-primary"></div>
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      <Link href={link} className="flex text-sm items-center text-primary">
        View All <ArrowRight size={15} />
      </Link>
    </div>
  );
}
