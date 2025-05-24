"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Check, Truck, X } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PatchStatusOrder } from "@/service/admin/orders";
import { Checkout } from "@prisma/client";

interface Order {
  order: Checkout;
  refetch: () => void;
}

const schema = z.object({
  status: z.enum([
    "placed",
    "processing",
    "on-the-way",
    "delivered",
    "cancelled",
  ]),
  noteFromShop: z.string().optional(),
});
type FormField = z.infer<typeof schema>;

export default function OrderActions({ order, refetch }: Order) {
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [noteFromShop, setNoteFromShop] = useState("");

  const { mutate: updateStatus } = useMutation({
    mutationFn: (data: FormField) => PatchStatusOrder(order.id, data.status, data.noteFromShop||""),
    onSuccess: () => {
      setIsLoadingForm(false);
      toast.success("Order status updated");
      setOpen(false);
      // setNotes("");
      refetch();
    },
    onError: (error:any) => {
      console.log(error);
      setIsLoadingForm(false);
      toast.error("Error updating order status");
    },
  });

  function handleUpdateStatus(status: FormField["status"]) {
    setIsLoadingForm(true);
    updateStatus({status, noteFromShop});
  }

  function openDialog(type: string) {
    setActionType(type);
    setOpen(true);
  }

  function getDialogContent() {
    switch (actionType) {
      case "processing":
        return {
          title: "Mark Order as Processing",
          description: "This will update the order status to 'processing'. Add any notes below (optional):",
          placeholder: "Enter processing details...",
          confirmText: "Confirm",
          confirmAction: () => handleUpdateStatus("processing"),
          confirmColor: "primary"
        };
      case "shipping":
        return {
          title: "Mark Order as Shipped",
          description: "This will update the order status to 'on-the-way'. Add any shipping notes below (optional):",
          placeholder: "Enter shipping details or tracking information...",
          confirmText: "Confirm",
          confirmAction: () => handleUpdateStatus("on-the-way"),
          confirmColor: "primary"
        };
      case "delivered":
        return {
          title: "Mark Order as Delivered",
          description: "This will complete the order and update the status to 'delivered'. Add any delivery notes below (optional):",
          placeholder: "Confirm delivery details...",
          confirmText: "Confirm",
          confirmAction: () => handleUpdateStatus("delivered"),
          confirmColor: "primary"
        };
      case "cancelled":
        return {
          title: "Cancel Order",
          description: "Are you sure you want to cancel this order? This action cannot be undone. Please provide a reason for cancellation:",
          placeholder: "Reason for cancellation...",
          confirmText: "Yes, cancel order",
          confirmAction: () => handleUpdateStatus("cancelled"),
          confirmColor: "destructive"
        };
      default:
        return {
          title: "",
          description: "",
          placeholder: "",
          confirmText: "",
          confirmAction: () => {},
          confirmColor: "primary"
        };
    }
  }

  const dialogContent = getDialogContent();

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Order Actions</h2>

        <div className="space-y-3">
          {order?.status === "placed" && (
            <Button 
              className="w-full text-white" 
              onClick={() => openDialog("processing")}
            >
              <Truck className="h-4 w-4 mr-2" />
              Processing Order
            </Button>
          )}
          
          {order?.status === "processing" && (
            <Button 
              className="w-full text-white" 
              onClick={() => openDialog("shipping")}
            >
              <Truck className="h-4 w-4 mr-2" />
              Mark as Shipped
            </Button>
          )}

          {order?.status === "on-the-way" && (
            <Button 
              className="w-full text-white bg-green-600 hover:bg-green-700"
              onClick={() => openDialog("delivered")}
            >
              <Check className="h-4 w-4 mr-2" />
              Mark as Delivered
            </Button>
          )}

          {order?.status !== "delivered" && order?.status !== "cancelled" && (
            <Button
              variant="outline"
              className="w-full text-red-600 border-red-300 hover:bg-red-50 mt-2"
              onClick={() => openDialog("cancelled")}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel Order
            </Button>
          )}
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>{dialogContent.title}</DialogTitle>
              <DialogDescription>
                {dialogContent.description}
                <Textarea
                  className="w-full mt-2 p-2 border rounded-md"
                  rows={3}
                  placeholder={dialogContent.placeholder}
                  value={noteFromShop}
                  onChange={(e) => setNoteFromShop(e.target.value)}
                />
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                variant={dialogContent.confirmColor === "destructive" ? "destructive" : "default"}
                className={dialogContent.confirmColor === "destructive" ? "" : "text-white"}
                onClick={dialogContent.confirmAction}
                disabled={isLoadingForm}
              >
                {isLoadingForm ? <span className="spinner" /> : dialogContent.confirmText}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}