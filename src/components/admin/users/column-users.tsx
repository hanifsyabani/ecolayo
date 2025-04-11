"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-actions";
import { Badge } from "@/components/ui/badge";

export type UserColumn = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
};

export const Columns = (refetchUsers: () => void): ColumnDef<UserColumn>[] => [
  {
    accessorKey: "name",
    header: "Name",
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
