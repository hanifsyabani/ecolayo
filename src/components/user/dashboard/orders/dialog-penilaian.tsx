import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export default function DialogPenilaian() {
  return (
    <form className="mb-16">
      <Label>Add comment</Label>
      <Textarea
        placeholder="Please add your comment here..."
        rows={4}
        className="border-2"
      />

      <div className="flex justify-end text-white mt-4">
        <Button>Post comment</Button>
      </div>
    </form>
  );
}
