"use client";

import { PostUser } from "@/service/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import UploadImage from "../banner/upload-image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  imageUrl: z.string().min(5, { message: "Image URL is required" }),
  role: z.string().min(1, { message: "Role is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  email: z.string().email({ message: "Email is invalid" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type FormFields = z.infer<typeof schema>;

export default function FormAddUser() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const { mutate: postUser } = useMutation({
    mutationFn: (data: FormFields) => PostUser(data),
    onSuccess: () => {
      setIsLoading(false);
      toast.success("User created successfully");
      router.push("/admin/users");
    },
    onError: () => {
      setIsLoading(false);
      toast.error("Error creating user");
    },
  });

  function onSubmit(data: FormFields) {
    setIsLoading(true);
    postUser(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="  w-full">
      <div className="flex gap-8">
        <div className="w-1/2 space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Add name user"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="example@gmail.com"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="role">Role</Label>
            <Select onValueChange={(value) => setValue("role", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem
                  value="user"
                  className="hover:bg-gray-200 cursor-pointer"
                >
                  User
                </SelectItem>
                <SelectItem
                  value="admin"
                  className="hover:bg-gray-200 cursor-pointer"
                >
                  Admin
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-1/2 space-y-4">
          <div>
            <Label htmlFor="status">Status</Label>
            <Select onValueChange={(value) => setValue("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem
                  value="active"
                  className="hover:bg-gray-200 cursor-pointer"
                >
                  Active
                </SelectItem>
                <SelectItem
                  value="inactive"
                  className="hover:bg-gray-200 cursor-pointer"
                >
                  Inactive
                </SelectItem>
              </SelectContent>
            </Select>
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
      </div>

      <Button disabled={isLoading} className="text-white mt-8">
        {isLoading ? <span className="spinner" /> : "Add User"}
      </Button>
    </form>
  );
}
