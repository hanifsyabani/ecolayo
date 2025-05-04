"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(1),
  confirmPassword: z.string().min(1),
});
type FormFields = z.infer<typeof schema>;

export default function FormChangePassword() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });



  return (
    <form className="space-y-4 mt-4">
      <div>
        <Label>Current Password</Label>
        <Input
          type="password"
          {...register("currentPassword")}
          name="currentPassword"
        />
      </div>
      <div className="flex ">
        <div>
          <Label>New Password</Label>
          <Input type="password" placeholder="Write new password" />
        </div>
        <div>
          <Label>Confirm Password</Label>
          <Input type="password" placeholder="Write confirm password" />
        </div>
      </div>
    </form>
  );
}
