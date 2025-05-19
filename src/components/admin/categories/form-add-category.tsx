"use client";

import { Button } from "@/components/ui/button";
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
import { GetBanners, PostBanner } from "@/service/admin/banners";
import { GetCategories, PostCategory } from "@/service/admin/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import UploadImage from "../banner/upload-image";

const schema = z.object({
  name: z.string().min(1),
  imageUrl: z.string().min(1),
});
type FormFields = z.infer<typeof schema>;

export default function FormAddCategory() {
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryFn: () => GetCategories(),
    queryKey: ["dataCategories"],
  });

  const { mutate: postCategory } = useMutation({
    mutationFn: (data: FormFields) => PostCategory(data),
    onSuccess: () => {
      setIsLoadingForm(false);
      toast.success("Category created successfully");
      router.push("/admin/categories");
    },
    onError: (error: any) => {
      setIsLoadingForm(false);
      const message =
        error?.error || error?.message || "Error creating category";
      toast.error(message);
    },
  });

  function onSubmit(data: FormFields) {
    setIsLoadingForm(true);
    postCategory(data);
  }

  if (isLoadingCategories) return <div className="spinner" />;
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
          title={"Add Category"}
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
            <Label htmlFor="imageUrl">Image</Label>
            <UploadImage
              value={[getValues("imageUrl") ?? ""].filter(Boolean)}
              onChange={(urls) => setValue("imageUrl", urls[0] || "")}
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
            {isLoadingForm ? <span className="spinner"></span> : "Create"}
          </Button>
        </div>
      </form>
    </>
  );
}
