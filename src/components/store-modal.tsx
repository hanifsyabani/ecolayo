"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import Modal from "./ui/modal";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(1),
});
type FormFields = z.infer<typeof schema>;

export default function StoreModal() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const storedModal = useStoreModal();
  const pathname = usePathname();

  useEffect(() => {
    if (storedModal.isOpen && pathname.includes("/user/store/")) {
      storedModal.onClose();
    }
  }, [pathname, storedModal]);

  async function onSubmit(data: FormFields) {
    try {
      setIsLoading(true);

      const response = await axios.post("/api/store", data);
      reset();
      toast.success("Store created successfully");

      router.push(`/user/store/${response.data.id}`);
    } catch (error) {
      toast.error("Failed to submit");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      title="Create Store"
      description="Add store to create product and category"
      isOpen={storedModal.isOpen}
      onClose={storedModal.onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="name">Name Store</Label>
          <Input
            {...register("name")}
            id="name"
            className="border border-primary"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        <div className="flex justify-end items-center gap-2 mt-4">
          <Button
            variant="outline"
            onClick={storedModal.onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            className={cn(
              "bg-primary text-white",
              isLoading && "cursor-not-allowed opacity-50"
            )}
            onKeyDown={(e) => e.key === "Enter"}
          >
            {isLoading ? <span className="spinner"></span> : "Submit"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
