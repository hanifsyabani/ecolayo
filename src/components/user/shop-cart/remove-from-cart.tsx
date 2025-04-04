import { deleteCartAsync, fetchCartAsync } from "@/app/redux/cart-slice";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface RemoveCartProps {
  itemid: string;
}

export default function RemoveFromCart({ itemid }: RemoveCartProps) {
  const [isLoading, setIsLoading] = useState(false);

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
        onClick={handleRemoveItem}
        className="cursor-pointer hover:bg-gray-200 bg-white border border-gray-200 p-1 rounded-full w-7 h-7"
        disabled={isLoading}
      >
        <X size={30} />
      </Button>
    </>
  );
}
