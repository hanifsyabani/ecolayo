"use client";

import ApiAlert from "@/components/ui/api-alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import useOrigin from "@/hooks/use-origin";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { MoveLeft, Save, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";


const schema = z.object({
  name: z.string().min(5),
});
type FormFields = z.infer<typeof schema>;

export default function SettingForm() {
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),

  });

  async function onSubmit(data: FormFields) {
    try {
      setIsLoadingForm(true);

      await axios.patch(`/api/store`, data);

      router.refresh();
      toast.success("Store updated successfully");
    } catch (error) {
      toast.error("Error updating");
    } finally {
      setIsLoadingForm(false);
    }
  }

  async function onDeleteStore() {
    try {
      setIsLoadingForm(true);

      await axios.delete(`/api/store/${params.storeid}`);
      toast.success("Store deleted successfully");
      router.refresh();
      router.push("/");
    } catch (error) {
      toast.error("Error deleting");
    } finally {
      setIsLoadingForm(false);
    }
  }

  return (
    <>
      <Button className="bg-secondary text-white" onClick={() => router.back()}>
        <MoveLeft />
      </Button>
      <div className="flex items-center justify-between mt-4">
        <Heading title="Settings" description="Manage store preferences" />

        <Button
          variant="destructive"
          className="bg-red-500 text-white hover:bg-red-700"
          onClick={() => setIsOpen(true)}
        >
          <Trash />
        </Button>
      </div>
      <Separator />
      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="name">Name Store</Label>
          <Input
            id="name"
            {...register("name")}
            className="border border-gray-800"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <Button
          className={cn(
            "bg-secondary text-white mt-4",
            isLoadingForm && "cursor-not-allowed opacity-50"
          )}
          disabled={isLoadingForm}
        >
          {isLoadingForm ? (
            <span className="spinner"></span>
          ) : (
            <>
              <Save />
              Save
            </>
          )}
        </Button>
      </form>

      <div className="mt-10">
        <ApiAlert
          title="PUBLIC_API_URL"
          description={`${origin}/api/${params.storeid}`}
          variant="public"
        />
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete the store?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant={"outline"} onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button
              className="bg-red-500 text-white hover:bg-red-700"
              onClick={() => onDeleteStore()}
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
