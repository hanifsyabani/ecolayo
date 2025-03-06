"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellActionCategory from "./cell-actions"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoryColumn = {
  id: string
  name: string
  bannerLabel: string
  createdAt: string
}

export const Columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "banner",
    header: "Banner",
    cell:({row}) => row.original.bannerLabel
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id : 'actions',
    header : 'Action',
    cell:({row}) => <CellActionCategory data={row.original}/>
  }
]
