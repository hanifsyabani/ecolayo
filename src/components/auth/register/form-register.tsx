"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { Register } from "@/service/auth";

const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  username: z
    .string()
    .min(5, { message: "Name must be at least 5 characters" }),
});
type FormFields = z.infer<typeof schema>;

export default function FormRegister() {
  const router = useRouter();
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const { mutate: registerUser } = useMutation({
    mutationFn: (data: FormFields) => Register(data),
    onSuccess: () => {
      setIsLoadingForm(false);
      toast.success("Register success");
      router.push("/login");
    },
    onError: (error: any) => {
      setIsLoadingForm(false);
      const message = error?.error || error?.message || "Error creating user";
      toast.error(message);
    },
  });

  async function onSubmit(data: FormFields) {
    setIsLoadingForm(true);
    registerUser(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-secondary">
        Register
      </h2>

      <Input
        {...register("username")}
        type="text"
        placeholder="Name"
        className="w-full p-2 border rounded"
      />
      {errors.username && (
        <p className="text-red-500">{errors.username.message as string}</p>
      )}

      <Input
        {...register("email")}
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
      />
      {errors.email && (
        <p className="text-red-500">{errors.email.message as string}</p>
      )}

      <Input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded"
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message as string}</p>
      )}

      <Button
        type="submit"
        className="w-full p-2 text-white bg-secondary rounded"
        disabled={isLoadingForm}
      >
        {isLoadingForm ? <p className="spinner" /> : "Register"}
      </Button>
      <p className="text-center text-sm">
        Have an account?{" "}
        <Link href={"/login"} className="text-blue-500">
          Login
        </Link>
      </p>
    </form>
  );
}
