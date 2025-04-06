"use client";

import toast from "react-hot-toast";
import { Copy, Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProductColumn } from "./columns-products";
import { useMutation } from "@tanstack/react-query";
import { DeleteProduct } from "@/service/products";
import Link from "next/link";

interface CellActionProps {
  data: ProductColumn;
  refetchProducts:() =>void
}

export default function CellActionCategory({data, refetchProducts}: CellActionProps) {
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  function onCopy(id: string) {
    navigator.clipboard.writeText(id);
    toast.success("Product Successfully copied");
  }

  const {mutate: deleteProduct } = useMutation({

    mutationFn: (id:string) => DeleteProduct(id),
    onSuccess: () => {
      setIsLoadingForm(false);
      toast.success("Product deleted successfully");
      setIsOpen(false)
      refetchProducts()
    },
    onError: () => {
      setIsLoadingForm(false);
      toast.error("Error deleting Product");
    },
  })

  function onDelete(id: string) {
    setIsLoadingForm(true);
    deleteProduct(id)
  }


  return (
    <>
      <div className="flex items-center gap-5">
        <Button
          className="bg-blue-500 w-7 h-7 text-white rounded-md cursor-pointer"
          onClick={() => onCopy(data.id)}
        >
          <Copy size={10} />
        </Button>
        <Link href={`/admin/products/${data.id}`}
          className="bg-secondary w-7 h-7 flex justify-center items-center text-white rounded-md cursor-pointer"
        >
          <Edit size={15} />
        </Link>
        <Button
          className="bg-red-500 w-7 h-7 text-white rounded-md cursor-pointer"
          onClick={() => setIsOpen(true)}
          disabled={isLoadingForm}
        >
          <Trash size={15} />
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete the product?
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
