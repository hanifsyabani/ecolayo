"use client";

import toast from "react-hot-toast";
import { BannerColumn } from "./columns-banner";
import { Copy, Edit, Trash } from "lucide-react";

interface CellActionProps {
  data: BannerColumn;
}

export default function CellAction(data: CellActionProps) {
  function onCopy(id: string) {
    navigator.clipboard.writeText(id);
    toast.success("Banner Successfully copied");
  }

  return (
    <div className="flex items-center gap-5">
      <div
        className="bg-blue-500 p-1 text-white rounded-md cursor-pointer"
        onClick={() => onCopy(data.data.id)}
      >
        <Copy size={15} />
      </div>
      <div className="bg-secondary p-1 text-white rounded-md">
        <Edit size={15} />
      </div>
      <div className="bg-red-500 p-1 text-white rounded-md">
        <Trash size={15} />
      </div>
    </div>
  );
}
