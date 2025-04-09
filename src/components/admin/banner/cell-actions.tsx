"use client";

import toast from "react-hot-toast";
import { BannerColumn } from "./columns-banner";
import { Copy, Edit, Trash } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DeleteBanner } from "@/service/banners";
import { useMutation } from "@tanstack/react-query";

interface CellActionProps {
  data: BannerColumn;
  refetchBanners : () => void
}

export default function CellAction({data, refetchBanners}: CellActionProps) {
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function onCopy(id: string) {
    navigator.clipboard.writeText(id);
    toast.success("Banner Successfully copied");
  }

  const { mutate: deleteBanner } = useMutation({
    mutationFn: (id: string) => DeleteBanner(id),
    onSuccess: () => {
      setIsLoadingForm(false);
      toast.success("Category deleted successfully");
      setIsOpen(false);
      refetchBanners()
    },
    onError: () => {
      setIsLoadingForm(false);
      toast.error("Error deleting Product");
    },
  });

  function onDelete(id: string) {
    setIsLoadingForm(true);
    deleteBanner(id);
  }

  return (
    <>
      <div className="flex items-center gap-5">
        <div
          className="bg-blue-500 p-1 text-white rounded-md cursor-pointer"
          onClick={() => onCopy(data.id)}
        >
          <Copy size={15} />
        </div>
        <Link
          href={`/admin/banners/${data.id}`}
          className="bg-secondary p-1 text-white rounded-md cursor-pointer"
        >
          <Edit size={15} />
        </Link>
        <div
          className="bg-red-500 p-1 text-white rounded-md cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <Trash size={15} />
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete the banner?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant={"outline"} onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-red-500 text-white hover:bg-red-700"
              onClick={() => onDelete(data.id)}
              disabled={isLoadingForm}
            >
              {isLoadingForm ? (
                <span className="spinner"></span>
              ) : (
                <>
                  <Trash />
                  Delete
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
