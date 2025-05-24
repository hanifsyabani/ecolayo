"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { format } from "date-fns";

export type FeedbackColumn = {
  id: string;
  username: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: string;
};

export const Columns = ({
  handleViewFeedback,
  getStatusBadge,
}: {
  handleViewFeedback: any;
  getStatusBadge: any;
}): ColumnDef<FeedbackColumn>[] => [
  {
    id: "eye",
    cell: ({ row }) => (
      <div
        onClick={() => handleViewFeedback(row.original)}
        className="cursor-pointer"
      >
        <Eye
          className="bg-gray-400 hover:bg-gray-600 p-1 text-white rounded"
          size={25}
        />
      </div>
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
    accessorKey: "subject",
    header: "Subject",
  },
  {
    id: "message",
    header: "Message",
    cell: ({ row }) => (
      <div>
        <p>{row.original.message.split(" ").slice(0, 10).join(" ")}</p>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => (
      <div>{format(row.original.createdAt, "dd/MM/yyyy")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{getStatusBadge(row.original.status)}</div>,
  },
];
