"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-actions";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Eye } from "lucide-react";

export type UserColumn = {
  id: string;
  username: string;
  email: string;
  role: string;
  status: string;
};

export const Columns = (refetchUsers: () => void): ColumnDef<UserColumn>[] => [
  {
    id: "eye",
    cell: ({ row }) => (
      <Link href={`/admin/users/${row.original.id}/profile`}>
        <Eye className="bg-gray-400 hover:bg-gray-600 p-1 text-white rounded" size={25}  />
      </Link>
    ),
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        className={`${
          row.original.status === "active" ? "bg-primary" : "bg-red-500"
        } text-white`}
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <CellAction data={row.original} refetchUsers={refetchUsers} />
    ),
  },
];
