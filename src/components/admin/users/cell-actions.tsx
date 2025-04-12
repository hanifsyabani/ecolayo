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
import { useMutation } from "@tanstack/react-query";
import { DeleteProduct } from "@/service/products";
import Link from "next/link";
import { UserColumn } from "./column-users";
import { DeleteUser } from "@/service/users";

interface CellActionProps {
  data: UserColumn;
  refetchUsers:() =>void
}

export default function CellAction({data, refetchUsers}: CellActionProps) {
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const {mutate: deleteUser } = useMutation({

    mutationFn: (id:string) => DeleteUser(id),
    onSuccess: () => {
      setIsLoadingForm(false);
      toast.success("User deleted successfully");
      setIsOpen(false)
      refetchUsers()
    },
    onError: (error:any) => {
      setIsLoadingForm(false);
      const message = error?.error || error?.message || "Error creating user";
      toast.error(message);
    },
  })

  function onDelete(id: string) {
    setIsLoadingForm(true);
    deleteUser(id)
  }


  return (
    <>
      <div className="flex items-center gap-5">
        <Link href={`/admin/users/${data.id}`}
          className="bg-secondary w-7 h-7 flex justify-center items-center text-white rounded-md cursor-pointer"
        >
          <Edit size={15} />
        </Link>
        <Button
          className="bg-red-500 w-7 h-7 hover:bg-red-800 text-white rounded-md cursor-pointer"
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
