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

const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  name: z.string().min(5, { message: "Name must be at least 5 characters" }),
});
type FormFields = z.infer<typeof schema>;

export default function Page() {
  const router = useRouter();
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setIsLoadingForm(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        toast.error("Failed to register");
        setIsLoadingForm(false);
      }
    } catch (error) {
    } finally {
      setIsLoadingForm(false);
    }

    router.push("/login");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 space-y-4 w-full max-w-lg bg-white shadow-lg rounded-md"
    >
      <h2 className="text-2xl font-bold text-center text-secondary">
        Register
      </h2>

      <Input
        {...register("name", { required: "Nama wajib diisi" })}
        type="text"
        placeholder="Name"
        className="w-full p-2 border rounded"
      />
      {errors.name && (
        <p className="text-red-500">{errors.name.message as string}</p>
      )}

      <Input
        {...register("email", { required: "Email wajib diisi" })}
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
      />
      {errors.email && (
        <p className="text-red-500">{errors.email.message as string}</p>
      )}

      <Input
        {...register("password", { required: "Password wajib diisi" })}
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
      >
        Register
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