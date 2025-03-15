'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface PreviewProductProps {
  open : boolean,
  setOpenDialog : (open : boolean) => void
}

export default function PreviewProduct({ open, setOpenDialog }: PreviewProductProps) {
  return (
    <>
      <Dialog open={open} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Product</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
