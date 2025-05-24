import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { FileText, Mail, MessageSquare, Trash2 } from "lucide-react";
import { JSX } from "react";

interface DialogDetailFeedbackProps {
  isViewDialogOpen: boolean;
  setIsViewDialogOpen: (open: boolean) => void;
  selectedFeedback: any;
  getStatusBadge: (status: string) => JSX.Element;
  updateStatus: () => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  isLoadingDelete: boolean;
  setIsLoadingDelete: (isLoading: boolean) => void;
  deletefeedback: () => void;
}

export default function DialogDetailFeedback({
  isViewDialogOpen,
  setIsViewDialogOpen,
  selectedFeedback,
  getStatusBadge,
  updateStatus,
  isLoading,
  setIsLoading,
  deletefeedback,
  isLoadingDelete,
  setIsLoadingDelete,
}: DialogDetailFeedbackProps) {
  function onSubmit() {
    setIsLoading(true);
    updateStatus();
  }

  function onDelete() {
    setIsLoadingDelete(true);
    deletefeedback();
  }
  return (
    <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
      <DialogContent className="max-w-2xl bg-white ">
        <DialogHeader>
          <DialogTitle>Feedback Details</DialogTitle>
          <DialogDescription>
            View complete feedback information
          </DialogDescription>
        </DialogHeader>

        {selectedFeedback && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              {getStatusBadge(selectedFeedback.status)}
              <span className="text-sm text-gray-500">
                {format(selectedFeedback.createdAt, "dd MMMM yyyy")}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="font-medium">From:</span>
              </div>
              <p>{selectedFeedback.email}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <FileText className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Subject:</span>
              </div>
              <p>{selectedFeedback.subject}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <MessageSquare className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Message:</span>
              </div>
              <Textarea rows={5} readOnly value={selectedFeedback.message} />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                className="bg-red-500 text-white hover:bg-red-800"
                onClick={onDelete}
                disabled={isLoadingDelete}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {isLoadingDelete ? <span className="spinner" /> : "Delete"}
              </Button>
              <Button
                className="text-white"
                onClick={onSubmit}
                disabled={isLoading}
              >
                {isLoading ? <span className="spinner" /> : "Mark as Resolved"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
