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
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { MoveLeft, X } from "lucide-react";
import {  useRouter } from "next/navigation";
import {  useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import UploadImage from "../banner/upload-image";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {  useMutation, useQuery } from "@tanstack/react-query";
import { GetCategories } from "@/service/categories";
import Link from "next/link";
import { PostProduct } from "@/service/products";

interface ProductFormProps {
  id: string;
}

const schema = z.object({
  name: z.string().min(1, { message: "Name must be at least 5 characters" }),
  price: z.coerce.number().min(1, { message: "Price must be at least 1" }),
  images: z
    .object({ url: z.string() })
    .array()
    .min(1, { message: "At least one image is required" }),
  categoryid: z.string().min(1, { message: "Category must be selected" }),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
  stars: z.coerce
    .number()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating must be at most 5" }),
  description: z
    .string()
    .min(1, { message: "Description must be at least 5 characters" }),
  shortDescription: z
    .string()
    .min(1, { message: "Short Description must be at least 5 characters" }),
  tag: z.string().array().default([]),
  stock: z.coerce.number().min(0),
});
type FormFields = z.infer<typeof schema>;

export default function FormAddProduct() {
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const router = useRouter();

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryFn: () => GetCategories(),
    queryKey: ["dataCategories"],
  });

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });


  

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      setValue("tag", newTags);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
    setValue("tag", newTags);
  };

  const { mutate: postProduct } = useMutation({
    mutationFn: (data: FormFields) => PostProduct(data),
    onSuccess: () => {
      setIsLoadingForm(false);
      toast.success("Product created successfully");
      router.push("/admin/products");
    },
    onError: (error: any) => {
      setIsLoadingForm(false);
      const message = error?.error || error?.message || "Error creating user";
      toast.error(message);
    },
  });

  function onSubmit(data: FormFields) {
    setIsLoadingForm(true);
    postProduct(data);
  }

  if (isLoadingCategories) return <div className="spinner"></div>;

  return (
    <>
      <Link href={`/admin/products`} >
        <MoveLeft className="bg-secondary text-white p-1 w-7 rounded mb-4" />
      </Link>
      <Heading
        title={"Add Product"}
        description="Manage products for your store"
      />
      <Separator />
      <form className="mt-10 space-y-4 " onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-10">
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
            <div className="flex items-center gap-4">
              <div className="w-1/2">
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
              <div className="w-1/2">
                <Label htmlFor="stock">Stock Product</Label>
                <Input
                  id="stock"
                  {...register("stock")}
                  className="border border-gray-800"
                  placeholder="Add stock product"
                  type="number"
                />
                {errors.stock && (
                  <p className="text-red-500 text-sm">{errors.stock.message}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-1/2">
                <Label>Category</Label>
                <Select
                  value={watch("categoryid")}
                  onValueChange={(value) => setValue("categoryid", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {categories?.map((category: any) => (
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
              <div className="w-1/2">
                <Label htmlFor="stars">Rating</Label>
                <Input
                  id="stars"
                  {...register("stars")}
                  className="border border-gray-800"
                  placeholder="5"
                  type="number"
                />
                {errors.stars && (
                  <p className="text-red-500 text-sm">{errors.stars.message}</p>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="shortDescription">Short Description</Label>
              <Textarea
                id="shortDescription"
                {...register("shortDescription")}
                className="border border-gray-800"
                placeholder="Add Short Description here..."
              />
              {errors.shortDescription && (
                <p className="text-red-500 text-sm">
                  {errors.shortDescription.message}
                </p>
              )}
            </div>
            <div className="flex items-center gap-10">
              <div>
                <Label>Featured</Label>
                <div className="flex items-center gap-2">
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
                <div className="flex items-center gap-2">
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

          <div className="w-1/2 space-y-4">
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                className="border border-gray-800 h-52"
                placeholder="Add Description here..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="tags">Tags</Label>
              <div className="flex gap-2">
                <Input
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addTag())
                  }
                  placeholder="Type a tag and press Enter"
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                  <Badge
                    key={index}
                    className="flex bg-secondary text-white items-center gap-1"
                  >
                    {tag}
                    <X
                      className="w-4 h-4 cursor-pointer"
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="">
              <Label htmlFor="images">Images</Label>
              <UploadImage
                value={
                  Array.isArray(getValues("images"))
                    ? getValues("images").map((img) => img.url)
                    : []
                }
                onChange={(urls: any) => {
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
                <p className="text-red-500 text-sm">
                  {errors.images?.message as string}
                </p>
              )}
            </div>
          </div>
        </div>
        <div>
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
