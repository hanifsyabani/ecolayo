"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-actions"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BannerColumn = {
  id: string
  label: string
  createdAt: string
}

export const BannerColumns: ColumnDef<BannerColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id : 'actions',
    header : 'Action',
    cell:({row}) => <CellAction data={row.original}/>
  }
]
