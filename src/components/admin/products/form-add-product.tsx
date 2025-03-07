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
import { Category, Images, Product } from "@prisma/client";
import axios from "axios";
import { MoveLeft, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import UploadImage from "../banner/upload-image";
import { Checkbox } from "@/components/ui/checkbox";

interface ProductFormProps {
  datas:
    | (Omit<Product, "price"> & {
        price: number; // Ganti Decimal jadi number
        images: Images[];
      })
    | null;
  categories: Category[] | null;
}

const schema = z.object({
  name: z.string().min(5, { message: "Name must be at least 5 characters" }),
  price: z.coerce.number().min(1, { message: "Price must be at least 1" }),
  images: z.object({ url: z.string() }).array().min(1, {message: "At least one image is required"}),
  categoryid: z.string().min(1, { message: "Category must be selected" }),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});
type FormFields = z.infer<typeof schema>;

export default function FormAddProduct(datas: ProductFormProps) {
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const router = useRouter();

  const isEditing = Boolean(datas.datas);
  // console.log(isEditing);

  const title = isEditing ? "Edit Product" : "Add Product";
  const toastMessage = isEditing
    ? "Product updated successfully"
    : "Product created successfully";
  const action = isEditing ? "Save changes" : "Create Product";

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: datas.datas?.name || "",
      images: datas.datas?.images || [],
      price: parseFloat(String(datas.datas?.price)) || 0,
      categoryid: datas.datas?.categoryid || "",
      isFeatured: datas.datas?.isFeatured || false,
      isArchived: datas.datas?.isArchived || false,
    },
  });

  async function onSubmit(data: FormFields) {
    try {
      setIsLoadingForm(true);
      if (isEditing) {
        await axios.patch(
          `/api/${params.storeid}/products/${params.productid}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeid}/products`, data);
      }
      router.refresh();
      router.push(`/admin/store/${params.storeid}/products`);
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

      await axios.delete(`/api/${params.storeid}/products/${params.productid}`);
      toast.success("Product deleted successfully");
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
        onClick={() => router.push(`/admin/store/${params.storeid}/products`)}
      >
        <MoveLeft />
      </Button>
      <div className="flex items-center justify-between mt-4">
        <Heading title={title} description="Manage products for your store" />
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
          <div className="w-1/2 space-y-4">
            <div>
              <Label htmlFor="name">Name Product</Label>
              <Input
                id="name"
                {...register("name")}
                className="border border-gray-800"
                placeholder="Add name product"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                {...register("price")}
                className="border border-gray-800"
                placeholder="Rp"
                type="number"
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>
            <div>
              <Label>Category</Label>
              <Select onValueChange={(value) => setValue("categoryid", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {datas.categories?.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id}
                      className="hover:bg-gray-200 cursor-pointer"
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.categoryid && (
                <p className="text-red-500 text-sm">
                  {errors.categoryid.message}
                </p>
              )}
            </div>
            <div className="flex items-center gap-10">
              <div>
                <Label>Featured</Label>
                <div className="flex  items-center gap-2">
                  <Checkbox
                    checked={watch("isFeatured")}
                    onCheckedChange={(checked) =>
                      setValue("isFeatured", checked === true)
                    }
                  />
                  <p className="text-sm">
                    The product will appear on the home page
                  </p>
                </div>
              </div>
              <div>
                <Label>Archived</Label>
                <div className="flex  items-center gap-2">
                  <Checkbox
                    checked={watch("isArchived")}
                    onCheckedChange={(checked) =>
                      setValue("isArchived", checked === true)
                    }
                  />
                  <p className="text-sm">
                    Products will be hidden in the store
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="images">Images</Label>
            <UploadImage
              value={
                Array.isArray(getValues("images"))
                  ? getValues("images").map((img) => img.url)
                  : []
              }
              onChange={(urls: any) => {
                // Pastikan `urls` selalu array
                const urlArray = Array.isArray(urls) ? urls : [urls];

                setValue(
                  "images",
                  urlArray.map((url: any) => ({ url }))
                );
              }}
              onRemove={(url) =>
                setValue(
                  "images",
                  (getValues("images") || []).filter((img) => img.url !== url)
                )
              }
            />
             {errors.images && (
                <p className="text-red-500 text-sm">{errors.images.message}</p>
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
