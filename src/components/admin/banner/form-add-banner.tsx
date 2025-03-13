"use client";

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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Banner } from "@prisma/client";
import axios from "axios";
import { MoveLeft, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import UploadImage from "./upload-image";

interface BannerFormProps {
  datas: Banner | null;
}

const schema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(5),
});
type FormFields = z.infer<typeof schema>;

export default function FormAddBanner(datas: BannerFormProps) {
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const router = useRouter();

  const isEditing = Boolean(datas.datas);
  // console.log(isEditing);

  const title = isEditing ? "Edit Banner" : "Add Banner";
  const toastMessage = isEditing
    ? "Banner updated successfully"
    : "Banner created successfully";
  const action = isEditing ? "Save changes" : "Create Banner";

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      label: datas.datas?.label || "",
      imageUrl: datas.datas?.imageUrl || "",
    },
  });

  async function onSubmit(data: FormFields) {
    try {
      setIsLoadingForm(true);
      if (isEditing) {
        await axios.patch(
          `/api/${params.storeid}/banner/${params.bannerid}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeid}/banner`, data);
      }
      router.refresh();
      router.push(`/admin/store/${params.storeid}/banners`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Please check your data");
    } finally {
      setIsLoadingForm(false);
    }
  }

  async function onDeleteBanner() {
    try {
      setIsLoadingForm(true);

      await axios.delete(`/api/${params.storeid}/banner/${params.bannerid}`);
      toast.success("Banner deleted successfully");
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
      <Button
        className="bg-secondary text-white"
        onClick={() => router.push(`/admin/store/${params.storeid}/banners`)}
      >
        <MoveLeft />
      </Button>
      <div className="flex items-center justify-between mt-4">
        <Heading title={title} description="Manage Banner for your store" />
        {isEditing && (
          <Button
            variant="destructive"
            className="bg-red-500 text-white hover:bg-red-700"
            onClick={() => setIsOpen(true)}
          >
            <Trash />
          </Button>
        )}
      </div>
      <Separator />
      <form className="mt-10 space-y-4 " onSubmit={handleSubmit(onSubmit)}>
        <div className="flex  gap-10">
          <div className="w-1/2">
            <Label htmlFor="label">Label Banner</Label>
            <Input
              id="label"
              {...register("label")}
              className="border border-gray-800"
              placeholder="Add label banner"
            />
            {errors.label && (
              <p className="text-red-500 text-sm">{errors.label.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="imageUrl">Image</Label>
            <UploadImage
              value={getValues("imageUrl") ? [getValues("imageUrl")] : []}
              onChange={(urls) => setValue("imageUrl", urls)}
              onRemove={() => setValue("imageUrl", "")}
            />
            {errors.imageUrl && (
              <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>
            )}
          </div>
        </div>
        <div className="">
          <Button
            className={cn(
              "bg-secondary text-white mt-4 ",
              isLoadingForm && "cursor-not-allowed opacity-50"
            )}
            disabled={isLoadingForm}
          >
            {isLoadingForm ? <span className="spinner"></span> : action}
          </Button>
        </div>
      </form>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete the banner?
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
              onClick={() => onDeleteBanner()}
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
