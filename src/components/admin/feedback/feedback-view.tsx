"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Download } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  DeleteFeedback,
  GetAllFeedback,
  UpdateStatusFeedback,
} from "@/service/admin/feedback";
import { Columns, FeedbackColumn } from "./column-feedback";
import { DataTable } from "@/components/ui/data-table";
import DialogDetailFeedback from "./dialog-detail-feedback";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { exportData } from "@/lib/utils";

export default function FeedbackView() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackColumn>();
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const {
    data: feedbacks,
    isLoading: isLoadingFeedback,
    refetch,
  } = useQuery({
    queryFn: () => GetAllFeedback(),
    queryKey: ["dataFeedbacks"],
  });

  const { mutate: updateStatus } = useMutation({
    mutationFn: () => UpdateStatusFeedback(selectedFeedback?.id || ""),
    onSuccess: () => {
      setIsLoading(false);
      setIsViewDialogOpen(false);
      toast.success("Status updated successfully");
      refetch();
    },
    onError: () => {
      setIsLoading(false);
      toast.error("Error updating status");
    },
  });

  const { mutate: deletefeedback } = useMutation({
    mutationFn: () => DeleteFeedback(selectedFeedback?.id || ""),
    onSuccess: () => {
      setIsLoadingDelete(false);
      setIsViewDialogOpen(false);
      toast.success("Feedback deleted successfully");
      refetch();
    },
    onError: () => {
      setIsLoadingDelete(false);
      toast.error("Error deleting feedback");
    },
  });

  const formattedFeedbacks: FeedbackColumn[] = feedbacks?.map(
    (feedback: any) => ({
      id: feedback.id,
      username: feedback.user.username,
      email: feedback.email,
      subject: feedback.subject,
      message: feedback.message,
      createdAt: feedback.createdAt,
      status: feedback.status,
    })
  );

  const filteredFeedback = formattedFeedbacks
    ?.filter((feedback: any) => {
      if (statusFilter !== "all" && feedback.status !== statusFilter) {
        // klo feedback bukan all dan dia bukan status yang dipilih maka tidak ditampilkan
        return false;
      }
      return true;
    })
    ?.sort((a: any, b: any) => {
      if (sortBy === "latest")
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      if (sortBy === "oldest")
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      return 0;
    });

  const handleViewFeedback = (feedback: any) => {
    setSelectedFeedback(feedback);
    setIsViewDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "unread":
        return (
          <Badge variant="destructive" className="text-white">
            Unread
          </Badge>
        );
      case "resolved":
        return (
          <Badge variant="default" className="bg-green-500 text-white">
            Resolved
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  function exportToExcel() {
    setIsLoading(true);
    exportData(formattedFeedbacks, "Feedbacks");
    setIsLoading(false);
  }

  if (isLoadingFeedback) return <div className="spinner" />;

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Feedback Management
              </h1>
              <p className="text-gray-500 mt-1">
                Review and manage all user feedback
              </p>
            </div>
            <Button className="text-white" onClick={exportToExcel}>
              <Download className="mr-2 h-4 w-4"  />
              Export Data
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Total Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{feedbacks.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Resolved
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {
                    feedbacks.filter(
                      (feedback: any) => feedback.status === "resolved"
                    ).length
                  }
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-4 w-1/2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem
                  value="all"
                  className="hover:bg-gray-200 cursor-pointer"
                >
                  All Statuses
                </SelectItem>
                <SelectItem
                  value="unread"
                  className="hover:bg-gray-200 cursor-pointer"
                >
                  Unread
                </SelectItem>
                <SelectItem
                  value="read"
                  className="hover:bg-gray-200 cursor-pointer"
                >
                  Read
                </SelectItem>
                <SelectItem
                  value="in-progress"
                  className="hover:bg-gray-200 cursor-pointer"
                >
                  In Progress
                </SelectItem>
                <SelectItem
                  value="resolved"
                  className="hover:bg-gray-200 cursor-pointer"
                >
                  Resolved
                </SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <Label className="text-sm">Sort By</Label>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem
                  value="latest"
                  className="hover:bg-gray-200 cursor-pointer"
                >
                  Latest
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

          <DataTable
            data={filteredFeedback}
            columns={Columns({ handleViewFeedback, getStatusBadge })}
            searchKey="username"
          />
        </div>
      </div>

      <DialogDetailFeedback
        selectedFeedback={selectedFeedback}
        isViewDialogOpen={isViewDialogOpen}
        setIsViewDialogOpen={setIsViewDialogOpen}
        getStatusBadge={getStatusBadge}
        updateStatus={updateStatus}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        isLoadingDelete={isLoadingDelete}
        setIsLoadingDelete={setIsLoadingDelete}
        deletefeedback={deletefeedback}
      />
    </div>
  );
}
