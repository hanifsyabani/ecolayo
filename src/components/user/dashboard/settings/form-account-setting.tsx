"use client";

import UploadImage from "@/components/admin/banner/upload-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  GetUserProfile,
  PatchUserProfile,
} from "@/service/shop/dashboard-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const schema = z.object({
  imageUrl: z.string().nullable().optional(),
  email: z.string().email({ message: "Email is invalid" }).nullable().optional(),
  phone: z.string().nullable().optional(),
  firstName: z.string().nullable().optional(),
  lastName: z.string().nullable().optional(),
});

type FormFields = z.infer<typeof schema>;

export default function FormAccountSetting() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const {
    data: user,
    isLoading: isLoadingUser,
    refetch,
  } = useQuery({
    queryFn: () => GetUserProfile(),
    queryKey: ["dataUser"],
  });

  useEffect(() => {
    if (user) {
      setValue("email", user.email);
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("phone", user.phone);
      setValue("imageUrl", user.imageUrl);
    }
  }, [user, setValue]);

  const { mutate: editUser } = useMutation({
    mutationFn: (data: FormFields) => PatchUserProfile(data),
    onSuccess: () => {
      setIsLoading(false);
      toast.success("User updated successfully");
      refetch();
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

  const imageUrl = watch("imageUrl");

  if (isLoadingUser) return <div className="spinner mt-10" />;

  return (
    <form className=" mt-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="lg:flex items-center gap-5">
        <div className="space-y-3 lg:w-1/2">
          <div>
            <Label>First Name</Label>
            <Input {...register("firstName")} name="firstName" />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <Label>Last Name</Label>
            <Input {...register("lastName")} name="lastName" />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>
          <div>
            <Label>Email</Label>
            <Input {...register("email")} name="email" />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input {...register("phone")} name="phone" />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>
        </div>
        <div className="lg:w-1/2">
          <Label htmlFor="imageUrl">Image</Label>
          <UploadImage
            value={imageUrl ? [imageUrl] : []}
            onChange={(urls) => setValue("imageUrl", urls[0] || "")}
            onRemove={() => setValue("imageUrl", "")}
          />
          {errors.imageUrl && (
            <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>
          )}
        </div>
      </div>

      <Button className="text-white mt-4" disabled={isLoading}>
        {isLoading ? <span className="spinner" /> : "Save"}
      </Button>
    </form>
  );
}
