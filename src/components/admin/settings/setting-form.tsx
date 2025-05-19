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
import axios from "axios";
import { Save, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import UploadImage from "../banner/upload-image";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetStore, PatchStore } from "@/service/admin/store";

const schema = z.object({
  store_name: z.string().min(5),
  logo: z.string().optional(),
  address: z.string().min(1),
  phone: z.string().min(1),
});
type FormFields = z.infer<typeof schema>;

export default function SettingForm() {
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
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
      store_name: "",
      logo: "",
      address: "",
      phone: "",
    },
  });

  const {
    data: store,
    isLoading: isLoadingStore,
  } = useQuery({
    queryFn: () => GetStore(),
    queryKey: ["dataStore"],
  });

  useEffect(() => {
    if (store) {
      setValue("store_name", store.store_name);
      setValue("logo", store.logo );
      setValue("address", store.address);
      setValue("phone", store.phone);
    }
  }, [store, reset, setValue]);

  const logo = watch("logo");

  const { mutate: updateStore } = useMutation({
    mutationFn: (data: FormFields) => PatchStore(data),
    onSuccess: () => {
      setIsLoadingForm(false);
      toast.success("Store updated successfully");
      router.push('/admin')
    },
    onError(error: any) {
      setIsLoadingForm(false);
      const message = error?.error || error?.message || "Error creating user";
      toast.error(message);
    },
  });
  async function onSubmit(data: FormFields) {
    setIsLoadingForm(true);
    updateStore(data);
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

  if (isLoadingStore) return <div className="spinner" />;

  return (
    <>
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" flex gap-8 mt-10">
          <div className="w-1/2 space-y-4">
            <div>
              <Label htmlFor="name">Name Store</Label>
              <Input
                id="name"
                {...register("store_name")}
                className="border border-gray-800"
              />
              {errors.store_name && (
                <p className="text-red-500 text-sm">
                  {errors.store_name.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                {...register("address")}
                className="border border-gray-800"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                {...register("phone")}
                className="border border-gray-800"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>
          </div>
          <div className="w-1/2">
            <div>
              <Label htmlFor="logo">Logo Store</Label>
              <UploadImage
                value={logo ? [logo] : []}
                onChange={(urls) => setValue("logo", urls[0] || "")}
                onRemove={() => setValue("logo", "")}
              />

              {/* <UploadImage
                value={imageUrl ? [imageUrl] : []}
                onChange={(urls) => setValue("imageUrl", urls[0] || "")}
                onRemove={() => setValue("imageUrl", "")}
              /> */}

              {errors.logo && (
                <p className="text-red-500 text-sm">{errors.logo.message}</p>
              )}
            </div>
          </div>
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
            <Button variant={"outline"} onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
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
