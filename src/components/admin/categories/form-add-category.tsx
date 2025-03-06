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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Banner, Category } from "@prisma/client";
import axios from "axios";
import { MoveLeft, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface CategoryFormProps {
  datas: Category | null;
  banners: Banner[] | null;
}

const schema = z.object({
  name: z.string().min(5),
  bannerid: z.string().min(5),
});
type FormFields = z.infer<typeof schema>;

export default function FormAddCategory(datas: CategoryFormProps) {
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const router = useRouter();

  const isEditing = Boolean(datas.datas);
  // console.log(isEditing);

  const title = isEditing ? "Edit Category" : "Add Category";
  const toastMessage = isEditing
    ? "Category updated successfully"
    : "Category created successfully";
  const action = isEditing ? "Save changes" : "Create Category";

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: datas.datas?.name || "",
      bannerid: datas.datas?.bannerid || "",
    },
  });

  async function onSubmit(data: FormFields) {
    try {
      setIsLoadingForm(true);
      if (isEditing) {
        await axios.patch(
          `/api/${params.storeid}/categories/${params.categoryid}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeid}/categories`, data);
      }
      router.refresh();
      router.push(`/admin/store/${params.storeid}/categories`);
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

      await axios.delete(
        `/api/${params.storeid}/category/${params.categoryid}`
      );
      toast.success("Category deleted successfully");
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
        onClick={() => router.push(`/admin/store/${params.storeid}/categories`)}
      >
        <MoveLeft />
      </Button>
      <div className="flex items-center justify-between mt-4">
        <Heading title={title} description="Manage Categories for your store" />
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
            <Label htmlFor="name">Name Category</Label>
            <Input
              id="name"
              {...register("name")}
              className="border border-gray-800"
              placeholder="Add name category"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="bannerid">Banner</Label>
            <Select onValueChange={(value) => setValue("bannerid", value)} value={datas.datas?.bannerid}>
              <SelectTrigger>
                <SelectValue placeholder="Select a banner" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {datas.banners?.map((banner) => (
                  <SelectItem key={banner.id} value={banner.id} className="hover:bg-gray-200 cursor-pointer">
                    {banner.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.bannerid && (
              <p className="text-red-500 text-sm">{errors.bannerid.message}</p>
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
              Are you sure you want to delete the category?
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
