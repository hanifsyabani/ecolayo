"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import toast from "react-hot-toast";
import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});
type FormFields = z.infer<typeof schema>;

export default function FormLogin() {
  const router = useRouter();
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormFields) => {
    setIsLoadingForm(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (res?.error) {
        toast.error("Email or password is incorrect");
        router.push("/login");
      }

      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoadingForm(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl text-secondary font-bold text-center">Login</h2>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          {...register("email", { required: "Email wajib diisi" })}
          type="email"
          placeholder="email@example.com"
          className="w-full p-2 border rounded"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          {...register("password", { required: "Password wajib diisi" })}
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full p-2 text-white bg-secondary hover:bg-green-900 rounded"
      >
        {isLoadingForm ? <span className="spinner"></span> : "Login"}
      </Button>
      <Link href={"/shop"} className="flex justify-center text-white">
        <Button>Go To Shop</Button>
      </Link>
      <p className="text-center text-sm">
        Dont have an account?{" "}
        <Link href={"/register"} className="text-blue-500">
          Register
        </Link>
      </p>
    </form>
  );
}
