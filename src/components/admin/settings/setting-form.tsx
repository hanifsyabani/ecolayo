"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import axios from "axios";
import { Save, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface SettingFormProps {
  datas: Store;
}

const schema = z.object({
  name: z.string().min(5),
});
type FormFields = z.infer<typeof schema>;

export default function SettingForm(datas: SettingFormProps) {
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const params = useParams();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: datas.datas.name,
    },
  });

  async function onSubmit(data: FormFields) {
    try {
      setIsLoadingForm(true);

      await axios.patch(`/api/store/${params.storeid}`, data);

      router.refresh();
      toast.success("Store updated successfully");
    } catch (error) {
      toast.error("Error updating");
    } finally {
      setIsLoadingForm(false);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage store preferences" />
        <Button variant="destructive" className="bg-red-500 text-white">
          <Trash />
        </Button>
      </div>
      <Separator />
      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="name">Name Store</Label>
          <Input
            id="name"
            {...register("name")}
            className="border border-gray-800"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <Button
          className={cn(
            "bg-secondary text-white mt-4",
            isLoadingForm && "cursor-not-allowed opacity-50"
          )}
          disabled={isLoadingForm}
        >
          {isLoadingForm ? (
            <span className="spinner"></span>
          ) : (
            <>
              <Save />
              Save
            </>
          )}
        </Button>
      </form>
    </>
  );
}
