"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-actions"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BannerColumn = {
  id: string
  label: string
  categoryBanner: string | null
  createdAt: string
}

export const Columns = (refetchBanners: () => void): ColumnDef<BannerColumn>[] => [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "categoryBanner",
    header: "Category Banner",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id : 'actions',
    header : 'Action',
    cell:({row}) => <CellAction data={row.original} refetchBanners={refetchBanners}/>
  }
]
