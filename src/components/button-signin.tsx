"use client";
import { Button } from "./ui/button";
import { LogIn} from "lucide-react";
import Link from "next/link";

export default function ButtonSignin() {
  return (
    <Link href={'/login'}>
      <Button className="text-white text-xs">
        <LogIn size={10} /> Sign In
      </Button>
    </Link>
  );
}
