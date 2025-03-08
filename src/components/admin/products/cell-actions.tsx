"use client";

import toast from "react-hot-toast";
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
import { ProductColumn } from "./columns-products";

interface CellActionProps {
  data: ProductColumn;
}

export default function CellActionCategory(data: CellActionProps) {
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const router = useRouter();

  function onCopy(id: string) {
    navigator.clipboard.writeText(id);
    toast.success("Product Successfully copied");
  }

  async function onDeleteProduct(id: string) {
    try {
      setIsLoadingForm(true);

      await axios.delete(`/api/${params.storeid}/products/${id}`);
      toast.success("Product deleted successfully");
      router.refresh();
      router.push(`/admin/store/${params.storeid}/products`);
    } catch (error) {
      toast.error("Error deleting");
    } finally {
      setIsLoadingForm(false);
    }
  }

  return (
    <>
      <div className="flex items-center gap-5">
        <div
          className="bg-blue-500 p-1 text-white rounded-md cursor-pointer"
          onClick={() => onCopy(data.data.id)}
        >
          <Copy size={15} />
        </div>
        <Link
          href={`/admin/store/${params.storeid}/products/${data.data.id}`}
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
              onClick={() => onDeleteProduct(data.data.id)}
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
