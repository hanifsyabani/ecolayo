'use client'

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface SettingFormProps {
  data: Store;
}

const schema = z.object({
  name: z.string().min(1),
});
type FormFields = z.infer<typeof schema>;

export default function SettingForm(data: SettingFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  return (
    <>
      <Heading title="Settings" description="Manage store preferences" />
      <Separator />
      <form className="mt-10">
        <div>
          <Label>Name Store</Label>
          <Input value={data.data.name} {...register("name")}  />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <Button className="mt-4 text-white bg-secondary">
          <Save/> Save
        </Button>
      </form>
    </>
  );
}
