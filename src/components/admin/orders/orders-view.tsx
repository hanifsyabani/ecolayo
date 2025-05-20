"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  RefreshCw,
  Download,
  ChevronDown,
  Eye,
  Truck,
  Check,
  X,
  Clock,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { GetAllOrders } from "@/service/admin/orders";
import { DataTable } from "@/components/ui/data-table";

import { format } from "date-fns";
import { formatter } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Columns, OrdersColumn } from "./column-all-orders";
import { statusOrder } from "@/lib/item";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function OrdersView() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("latest");
  const [isDownload, setIsDownload] = useState(false);

  const {
    data: orders,
    isLoading: isLoadingOrders,
    refetch,
  } = useQuery({
    queryFn: () => GetAllOrders(),
    queryKey: ["dataOrders"],
  });

  const formattedOrder: OrdersColumn[] = orders?.map((checkout: any) => ({
    id: checkout.id,
    date: format(checkout.createdAt, "dd MMMM yyyy"),
    total: formatter.format(checkout.subtotal),
    status: checkout.status,
  }));

  const filteredOrder = formattedOrder
    ?.filter((order: any) => {
      if (selectedStatus !== "all" && order.status !== selectedStatus) {
        // klo order bukan all dan dia bukan status yang dipilih maka tidak ditampilkan
        return false;
      }
      return true;
    })
    ?.sort((a: any, b: any) => {
      if (sortOrder === "latest")
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      if (sortOrder === "oldest")
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      return 0;
    });

  function exportData() {
    setIsDownload(true);
    // Buat worksheet & workbook
    const worksheet = XLSX.utils.json_to_sheet(formattedOrder);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const fileData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(fileData, "orders.xlsx");
    setIsDownload(false);
  }

  if (isLoadingOrders) return <div className="spinner"></div>;
  return (
    <>
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-primary">Orders Management</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex flex-1 flex-wrap justify-between items-center gap-3">
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <Label
                    htmlFor="status"
                    className="text-sm font-medium text-gray-700"
                  >
                    Status:
                  </Label>
                  <Select onValueChange={(value) => setSelectedStatus(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {statusOrder.map((status) => (
                        <SelectItem
                          key={status.label}
                          value={status.value}
                          className="hover:bg-gray-200 cursor-pointer "
                        >
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Label
                    htmlFor="date"
                    className="text-sm font-medium text-gray-700"
                  >
                    Sort:
                  </Label>
                  <Select onValueChange={(value) => setSortOrder(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Newest" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem
                        value="latest"
                        className="hover:bg-gray-200 cursor-pointer"
                      >
                        Newest
                      </SelectItem>
                      <SelectItem
                        value="oldest"
                        className="hover:bg-gray-200 cursor-pointer"
                      >
                        Oldest
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant={"outline"}>
                  <RefreshCw
                    className="h-4 w-4 mr-1"
                    onClick={() => refetch()}
                  />
                  Refresh
                </Button>

                <Button
                  onClick={exportData}
                  className="text-white"
                  disabled={isDownload}
                >
                  <Download className="h-4 w-4 mr-1" />
                  {isDownload ? <span className="spinner" /> : "Export"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 sm:p-6">
            <DataTable
              data={filteredOrder}
              columns={Columns()}
              searchKey="id"
            />
          </div>
        </div>
      </div>
    </>
  );
}
