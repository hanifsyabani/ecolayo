"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { GetUsers } from "@/service/users";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Columns, UserColumn } from "./column-users";

export default function ListUsers() {
  const {
    data: users,
    isLoading: isLoadingUsers,
    refetch: refetchUsers,
  } = useQuery({
    queryFn: () => GetUsers(),
    queryKey: ["dataUsers"],
  });

  if (isLoadingUsers) return <div className="spinner" />;

  const formattedUsers: UserColumn[] = (users ?? []).map((user: any) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  }));

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Users" description="Manage Users" />
        <Link href={`/admin/users/new`}>
          <Button className="text-white text-sm bg-secondary">
            <Plus /> Add New
          </Button>
        </Link>
      </div>
      <Separator className="my-4 bg-gray-300" />

      <DataTable
        data={formattedUsers}
        columns={Columns(refetchUsers)}
        searchKey="name"
      />
    </>
  );
}
