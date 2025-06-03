"use client";

import { IoLocationSharp } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { GetStore } from "@/service/admin/store";
import { useSession } from "next-auth/react";
import ButtonSignout from "../button-signout";
import ButtonSignin from "../button-signin";

export default function NavTopUser() {
  const { data: session, status } = useSession();

  const { data: store, isLoading: isLoadingStore } = useQuery({
    queryFn: () => GetStore(),
    queryKey: ["dataStore"],
  });


  return (
    <nav className="flex justify-between items-center px-4 py-1">
      <div className="flex items-center">
        <IoLocationSharp size={20} className="text-gray-500" />
        <p className="text-xs text-gray-500">
          {isLoadingStore ? "Loading..." : `Store Location: ${store?.address}`}
        </p>
      </div>

      {status === "authenticated" ? (
        <div>
          <ButtonSignout />
        </div>
      ) : (
        <ButtonSignin />
      )}
    </nav>
  );
}
