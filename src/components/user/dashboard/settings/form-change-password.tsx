"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UpdatePassword } from "@/service/shop/dashboard-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const schema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(1),
  confirmPassword: z.string().min(1),
});
type FormFields = z.infer<typeof schema>;

export default function FormChangePassword() {
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const { mutate: updatepassword } = useMutation({
    mutationFn: (data: FormFields) => UpdatePassword(data),
    onSuccess: () => {
      setIsLoadingForm(false);
      toast.success("Password updated successfully");
      reset()
    },
    onError: (error: any) => {
      setIsLoadingForm(false);
      const message = error?.error || error?.message || "";
      toast.error(message);
    },
  });

  function onSubmit(data: FormFields) {
    setIsLoadingForm(true);
    updatepassword(data);
  }

  return (
    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div>
          <Label>Current Password</Label>
          <Input
            type="password"
            {...register("currentPassword")}
            placeholder="Write current password"
          />
          {errors.currentPassword && (
            <span className="text-red-500">
              {errors.currentPassword.message}
            </span>
          )}
        </div>
        <div className="flex gap-4 items-center ">
          <div>
            <Label>New Password</Label>
            <Input
              type="password"
              placeholder="Write new password"
              {...register("newPassword")}
            />
            {errors.newPassword && (
              <span className="text-red-500">{errors.newPassword.message}</span>
            )}
          </div>
          <div>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              placeholder="Write confirm password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>
      </div>
      <Button disabled={isLoadingForm} className="text-white mt-8">
        {isLoadingForm ? <span className="spinner" /> : "Save Changes"}
      </Button>
    </form>
  );
}
