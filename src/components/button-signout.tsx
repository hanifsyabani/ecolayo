"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export default function ButtonSignout() {
  function onLogout() {
    signOut({ callbackUrl: "/login" });
  }
  return (
    <Button className="text-white text-xs" onClick={onLogout}>
      <LogOut size={10} /> Sign Out
    </Button>
  );
}
