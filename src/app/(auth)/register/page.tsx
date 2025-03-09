"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setError("");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      setError("Gagal mendaftar. Coba lagi.");
      return;
    }

    router.push("/login");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 space-y-4 bg-white shadow-lg rounded-md"
    >
      <h2 className="text-2xl font-bold">Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      
      <Input
        {...register("name", { required: "Nama wajib diisi" })}
        type="text"
        placeholder="Name"
        className="w-full p-2 border rounded"
      />
      {errors.name && <p className="text-red-500">{errors.name.message as string}</p>}

      <Input
        {...register("email", { required: "Email wajib diisi" })}
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
      />
      {errors.email && <p className="text-red-500">{errors.email.message as string}</p>}

      <Input
        {...register("password", { required: "Password wajib diisi" })}
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded"
      />
      {errors.password && <p className="text-red-500">{errors.password.message as string}</p>}

      <Button type="submit" className="w-full p-2 text-white bg-blue-500 rounded">
        Register
      </Button>
    </form>
  );
}