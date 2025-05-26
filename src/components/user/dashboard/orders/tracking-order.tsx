"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PatchStatusOrder } from "@/service/admin/orders";
import { Checkout } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import DialogPenilaian from "./dialog-penilaian";

interface TrackingOrderProps {
  data: Checkout;
  refetch: () => void;
}

const trackingStatus = [
  { status: "placed", no: "01" },
  { status: "processing", no: "02" },
  { status: "on-the-way", no: "03" },
  { status: "delivered", no: "04" },
  { status: "completed", no: "05" },
];

export default function TrackingOrder({ data, refetch }: TrackingOrderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const currentStepIndex = trackingStatus.findIndex(
    (step) => step.status === data.status
  );

  const { mutate: updateStatus } = useMutation({
    mutationFn: ({
      id,
      status,
      noteFromShop,
    }: {
      id: string;
      status: string;
      noteFromShop: string;
    }) => PatchStatusOrder(id, status, noteFromShop || ""),
    onSuccess: () => {
      setIsLoading(false);
      toast.success("Thank you for confirmation");
      refetch();
    },
    onError: () => {
      setIsLoading(false);
      toast.error("Error occurred");
    },
  });

  function onSubmit(id: string, status: string, noteFromShop: string) {
    setIsLoading(true);
    updateStatus({ id, status, noteFromShop });
  }

  return (
    <>
      <div className="my-10 flex justify-evenly items-center relative">
        {trackingStatus.map((item, index) => {
          const isCompleted = index <= currentStepIndex;
          return (
            <div
              className="flex flex-col items-center relative"
              key={item.status}
            >
              {index !== 0 && (
                <div
                  className={`absolute top-7 right-full w-24 h-1 ${
                    isCompleted ? "bg-primary" : "bg-gray-300"
                  }`}
                />
              )}

              <div
                className={`rounded-full w-14 h-14 flex items-center justify-center text-white border-2 ${
                  isCompleted
                    ? "bg-primary border-primary"
                    : "bg-white border-primary text-primary"
                }`}
              >
                {isCompleted ? (
                  index === 0 ? (
                    <span className="text-xl font-bold">✔</span>
                  ) : (
                    <span className="text-sm font-semibold">{item.no}</span>
                  )
                ) : (
                  <span className="text-sm font-semibold text-primary">
                    {item.no}
                  </span>
                )}
              </div>

              <span
                className={`mt-2 text-sm ${
                  isCompleted ? "text-primary" : "text-gray-500"
                }`}
              >
                {item.status}
              </span>
            </div>
          );
        })}
      </div>
      {data.status === "delivered" && (
        <div className="flex justify-center my-4">
          <Button
            disabled={data.status !== "delivered" || isLoading}
            onClick={() => onSubmit(data.id, "completed", "")}
            className="text-white"
          >
            {isLoading ? <span className="spinner" /> : "Confirm Delivery"}
          </Button>
        </div>
      )}
      {data.status === "completed" && (
        <DialogPenilaian/>
      )}
    </>
  );
}
