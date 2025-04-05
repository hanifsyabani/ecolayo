import { deleteCartAsync, fetchCartAsync } from "@/app/redux/cart-slice";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface RemoveCartProps {
  itemid: string;
}

export default function RemoveFromCart({ itemid }: RemoveCartProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const dispatch = useAppDispatch();

  async function handleRemoveItem() {
    setIsLoading(true);
    try {
      await dispatch(deleteCartAsync({itemid })).unwrap();
      await dispatch(fetchCartAsync()).unwrap();
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Button
        onClick={() => setOpenDialog(true)}
        className="cursor-pointer hover:bg-gray-200 bg-white border border-gray-200 p-1 rounded-full w-7 h-7"
        disabled={isLoading}
      >
        <X size={30} />
      </Button>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Just Checking!</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this product from your cart?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setOpenDialog(false)} variant={"outline"}>
              Cancel
            </Button>
            <Button
              onClick={handleRemoveItem}
              className="text-white bg-red-500 hover:bg-red-900"
              disabled={isLoading}
            >
              {isLoading ? <p className="spinner"/> : "Remove"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
