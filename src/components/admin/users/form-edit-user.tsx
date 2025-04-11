"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DeleteUser, GetUserById, PatchUser } from "@/service/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import UploadImage from "../banner/upload-image";
import { MoveLeft, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FormEditUserProps {
  userId: string;
}

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  imageUrl: z.string().optional(),
  role: z.string().min(1, { message: "Role is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  email: z.string().email({ message: "Email is invalid" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type FormFields = z.infer<typeof schema>;

export default function FormEditUser({ userId }: FormEditUserProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryFn: () => GetUserById(userId),
    queryKey: ["dataUser"],
  });

  // ...
  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("role", user.role);
      setValue("status", user.status);
      setValue("password", user.password)
      setValue("imageUrl", user.imageUrl || "");
    }
  }, [user, setValue]);

  const { mutate: editUser } = useMutation({
    mutationFn: (data: FormFields) => PatchUser(userId, data),
    onSuccess: () => {
      setIsLoading(false);
      toast.success("User updated successfully");
      router.push("/admin/users");
    },
    onError: (error: any) => {
      setIsLoading(false);
      const message = error?.error || error?.message || "Error creating user";
      toast.error(message);
    },
  });

  function onSubmit(data: FormFields) {
    setIsLoading(true);
    editUser(data);
  }

  const { mutate: deleteUser } = useMutation({
    mutationFn: (id: string) => DeleteUser(id),
    onSuccess: () => {
      setIsLoading(false);
      toast.success("Product deleted successfully");
      setIsOpen(false);
      router.push(`/admin/products`);
    },

    onError: (error: any) => {
      setIsLoading(false);
      const message = error?.error || error?.message || "Error creating user";
      toast.error(message);
    },
  });

  function onDelete(id: string) {
    setIsLoading(true);
    deleteUser(id);
  }

  if (isLoadingUser) return <div className="spinner" />;

  return (
    <>
      <div className="flex items-center justify-between">
        <Button
          className="bg-secondary text-white"
          onClick={() => router.push(`/admin/users`)}
        >
          <MoveLeft />
        </Button>

        <Button
          variant="destructive"
          className="bg-red-500 text-white hover:bg-red-700"
          onClick={() => setIsOpen(true)}
        >
          <Trash />
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-8">
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
                autoComplete="off"
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
                autoComplete="off"
                {...register("password")}
                placeholder="Enter password"
                readOnly
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="role">Role</Label>
              <Select onValueChange={(value) => setValue("role", value)} value={watch("role")}>
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
              <Select onValueChange={(value) => setValue("status", value)} value={watch("status")}>
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
                value={[getValues("imageUrl") ?? ""].filter(Boolean)}
                onChange={(urls) => setValue("imageUrl", urls[0] || "")}
                onRemove={() => setValue("imageUrl", "")}
              />

              {errors.imageUrl && (
                <p className="text-red-500 text-sm">
                  {errors.imageUrl.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <Button disabled={isLoading} className="text-white mt-8">
          {isLoading ? <span className="spinner" /> : "Add User"}
        </Button>
      </form>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this user?
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
              onClick={() => onDelete(userId)}
              disabled={isLoading}
            >
              {isLoading ? (
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
