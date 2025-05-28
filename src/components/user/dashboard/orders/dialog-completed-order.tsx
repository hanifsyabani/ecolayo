import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DialogCompletedOrderProps {
  data: any;
  onSubmit: (id: string, status: string, reason: string) => void;
  isLoading: boolean;
  isOpenDialog: boolean;
  setIsOpenDialog: (open: boolean) => void;
}

export default function DialogCompletedOrder({
  data,
  onSubmit,
  isLoading,
  isOpenDialog,
  setIsOpenDialog,
}: DialogCompletedOrderProps) {
  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpenDialog(true)} className="text-white">
          Completed Order
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogTitle>Confirm Delivery</DialogTitle>
        <h1>Are you sure you want to mark this order as completed?</h1>
        <DialogFooter>
          <Button
            onClick={() => setIsOpenDialog(false)}
            className="bg-red-500 hover:bg-red-800 text-white"
          >
            Cancel
          </Button>
          <Button
            disabled={data.status !== "delivered" || isLoading}
            onClick={() => onSubmit(data.id, "completed", "")}
            className="text-white"
          >
            {isLoading ? <span className="spinner" /> : "Confirm Delivery"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
