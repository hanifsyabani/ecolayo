"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DeleteUser, GetUserById } from "@/service/admin/users";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import DialogDeleteUser from "./dialog-delete-user";
import { detailProfileUser } from "@/lib/item";
import { Separator } from "@/components/ui/separator";
import OrderByUser from "./order-by-user";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

interface ProfileUserProps {
  id: string;
}

export default function ProfileUser({ id }: ProfileUserProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryFn: () => GetUserById(id),
    queryKey: ["dataUser"],
  });

  const fullName = user?.firstName + " " + user?.lastName;

  const { mutate: deleteUser } = useMutation({
    mutationFn: (id: string) => DeleteUser(id),
    onSuccess: () => {
      setIsLoading(false);
      toast.success("Product deleted successfully");
      setIsOpen(false);
      router.push(`/admin/products`);
    },

    onError: (error: any) => {
      setIsLoading(false);
      const message = error?.error || error?.message || "Error creating user";
      toast.error(message);
    },
  });

  function onDelete(id: string) {
    setIsLoading(true);
    deleteUser(id);
  }

  const formattedUser = {
    ...user,
    lastLogin: user?.lastLogin
      ? new Date(user?.lastLogin).toLocaleString()
      : "-",
    phone: user?.phone ? "+62" + user?.phone : "-",
  };

  if (isLoadingUser) return <div className="spinner"></div>;
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-10 -mt-10">
          <div>
            {user && user.imageUrl ? (
              <Image
                src={user?.imageUrl}
                alt={user?.name || "profile img"}
                width={100}
                height={100}
                className="w-32 h-32 rounded-full"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-400"></div>
            )}
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-semibold">{fullName}</h1>
            <Badge
              className={`text-sm  ${
                user?.status === "active"
                  ? "bg-green-300 text-green-600"
                  : "bg-red-300 text-red-600"
              }`}
            >
              {user?.status}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href={`/admin/users/${id}`}>
            <Button className="text-white">
              <FaPencilAlt />
            </Button>
          </Link>
          <Button
            className="border border-red-600 hover:bg-red-600 group hover:text-white"
            variant={"outline"}
            onClick={() => setIsOpen(true)}
          >
            <FaTrash
              size={20}
              className="text-red-500 group-hover:text-white"
            />
          </Button>
        </div>
      </div>

      <h1 className="font-semibold mt-10">Details</h1>
      <Separator className="my-1 bg-gray-300" />
      <div className="flex flex-wrap gap-6 items-center">
        {detailProfileUser.map((item) => (
          <div key={item.key} className="text-sm w-52 space-y-1">
            <h1>{item.title}</h1>
            <p className="font-semibold">{formattedUser[item.key]}</p>
          </div>
        ))}
      </div>

      <OrderByUser userid={id} />

      <DialogDeleteUser
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onDelete={onDelete}
        userId={id}
        isLoading={isLoading}
      />
    </>
  );
}
