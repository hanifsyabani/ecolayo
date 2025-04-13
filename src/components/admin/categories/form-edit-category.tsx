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
import axios from "axios";
import { MoveLeft, Trash, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { GetProductById } from "@/service/products";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  DeleteCategory,
  GetCategories,
  GetCategoriesById,
  PatchCategory,
} from "@/service/categories";
import { GetBanners } from "@/service/banners";

interface CategoryFormProps {
  id: string;
}

const schema = z.object({
  name: z.string().min(1),
  bannerid: z.string().min(5),
});
type FormFields = z.infer<typeof schema>;

export default function FormEditCategory({ id }: CategoryFormProps) {
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      bannerid: "",
    },
  });

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryFn: () => GetCategoriesById(id),
    queryKey: ["dataCategory"],
  });

  const { data: banners, isLoading: isLoadingBanners } = useQuery({
    queryFn: () => GetBanners(),
    queryKey: ["dataBanner"],
  });

  useEffect(() => {
    if (categories) {
      reset({
        name: categories.name || "",
        bannerid: categories.bannerid || "",
      });
    }
  }, [categories, setValue, reset]);

   const { mutate: patchCategory } = useMutation({
      mutationFn: (data: FormFields) => PatchCategory(id, data),
      onSuccess: () => {
        setIsLoadingForm(false);
        toast.success("Category updated successfully");
        router.push("/admin/categories");
      },
      onError: (error: any) => {
        setIsLoadingForm(false);
        const message = error?.error || error?.message || "Error updating category";
        toast.error(message);
      },
    });
  
    function onSubmit(data: FormFields) {
      setIsLoadingForm(true);
      patchCategory(data);
    }

  const { mutate: deleteCategory } = useMutation({
    mutationFn: (id: string) => DeleteCategory(id),
    onSuccess: () => {
      setIsLoadingForm(false);
      toast.success("Category deleted successfully");
      setIsOpen(false);
      router.push(`/admin/categories`);
    },
    onError: (error:any) => {
      setIsLoadingForm(false);
      const message = error?.error || error?.message || "Error deleting category";
        toast.error(message);
    },
  });

  function onDelete(id: string) {
    setIsLoadingForm(true);
    deleteCategory(id);
  }

  if (isLoadingBanners || isLoadingCategories || !banners || !categories)
    return <div className="spinner" />;

  return (
    <>
      <Button
        className="bg-secondary text-white"
        onClick={() => router.push(`/admin/categories`)}
      >
        <MoveLeft />
      </Button>
      <div className="flex items-center justify-between mt-4">
        <Heading
          title={"Edit Category"}
          description="Manage Categories for your store"
        />
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
            <Select
              onValueChange={(value) => setValue("bannerid", value)}
              value={watch("bannerid")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a banner" />
              </SelectTrigger>
              <SelectContent className="bg-white max-h-60">
                {banners?.map((banner: any) => (
                  <SelectItem
                    key={banner.id}
                    value={banner.id}
                    className="hover:bg-gray-200 cursor-pointer"
                  >
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
            {isLoadingForm ? <span className="spinner"></span> : "Save"}
          </Button>
        </div>
      </form>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete the product?
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
              onClick={() => onDelete(id)}
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
