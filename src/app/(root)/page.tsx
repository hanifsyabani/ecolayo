"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";

export default function Page() {
  const onOpen = useStoreModal((state) => state.onOpen);

  useEffect(() => {
    onOpen();
  }, []); 

  return null;
}
