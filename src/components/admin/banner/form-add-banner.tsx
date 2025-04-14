"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveLeft} from "lucide-react";
import {  useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import UploadImage from "./upload-image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { PostBanner } from "@/service/banners";


const schema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
  categoryBanner: z.string().min(1),
});
type FormFields = z.infer<typeof schema>;

export default function FormAddBanner() {
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

  const { mutate: postBanner } = useMutation({
    mutationFn: (data: FormFields) => PostBanner(data),
    onSuccess: () => {
      setIsLoadingForm(false);
      toast.success("Banner created successfully");
      router.push("/admin/banners");
    },
    onError: (error: any) => {
      setIsLoadingForm(false);
      const message = error?.error || error?.message || "Error creating banner";
      toast.error(message);
    },
  });

  function onSubmit(data: FormFields) {
    setIsLoadingForm(true);
    postBanner(data);
  }

  return (
    <>
      <Button
        className="bg-secondary text-white"
        onClick={() => router.push(`/admin/banners`)}
      >
        <MoveLeft />
      </Button>
      <div className="flex items-center justify-between mt-4">
        <Heading title={"Add Banner"} description="Manage Banner for your store" />
      </div>
      <Separator />
      <form className="mt-10 space-y-4 " onSubmit={handleSubmit(onSubmit)}>
        <div className="flex  gap-10">
          <div className="w-1/2 space-y-4">
            <div>
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
              <Label htmlFor="label">Category Banner</Label>
              <Select
                onValueChange={(value) => setValue("categoryBanner", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category Banner" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem
                    value="main jumbotron"
                    className="hover:bg-gray-200 cursor-pointer "
                  >
                    Main-Jumbotron
                  </SelectItem>
                  <SelectItem
                    value="sec jumbotron"
                    className="hover:bg-gray-200 cursor-pointer "
                  >
                    sec-Jumbotron
                  </SelectItem>
                  <SelectItem
                    value="third jumbotron"
                    className="hover:bg-gray-200 cursor-pointer "
                  >
                    third-Jumbotron
                  </SelectItem>
                  <SelectItem
                    value="promote"
                    className="hover:bg-gray-200 cursor-pointer "
                  >
                    Promote
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.categoryBanner && (
                <p className="text-red-500 text-sm">
                  {errors.categoryBanner.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="imageUrl">Image</Label>
            <UploadImage
              value={getValues("imageUrl") ? [getValues("imageUrl")] : []}
              onChange={(urls) => setValue("imageUrl", urls[0] || "")} // Ambil elemen pertama
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
