import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
interface DialogDeleteUserProps {
  userId: string
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

export default function DialogDeleteUser({
  isOpen,
  setIsOpen,
  onDelete,
  userId,
  isLoading,
}: DialogDeleteUserProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this user?</DialogTitle>
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
            onClick={() => onDelete(userId)}
            disabled={isLoading}
          >
            {isLoading ? (
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
  );
}
