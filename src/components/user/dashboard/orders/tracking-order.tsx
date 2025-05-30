"use client";

import { PatchStatusOrder } from "@/service/admin/orders";
import { Order } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import DialogProductReview from "./dialog-product-review";
import DialogCompletedOrder from "./dialog-completed-order";

interface TrackingOrderProps {
  orderData: Order;
  refetchOrder: () => void;
  refetchReview: () => void;
  reviewDataLength: any;
}

const trackingStatus = [
  { status: "placed", no: "01" },
  { status: "processing", no: "02" },
  { status: "on-the-way", no: "03" },
  { status: "delivered", no: "04" },
  { status: "completed", no: "05" },
];

export default function TrackingOrder({
  orderData,
  refetchOrder,
  refetchReview,
  reviewDataLength,
}: TrackingOrderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const currentStepIndex = trackingStatus.findIndex(
    (step) => step.status === orderData.status
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
      toast.success("Order completed. Thank you for confirming!");
      setIsOpenDialog(false);
      refetchOrder();
    },
    onError: () => {
      setIsLoading(false);
      setIsOpenDialog(false);
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
      {orderData.status === "delivered" && (
        <div className="flex justify-center my-4">
          <DialogCompletedOrder
            data={orderData}
            onSubmit={onSubmit}
            isLoading={isLoading}
            isOpenDialog={isOpenDialog}
            setIsOpenDialog={setIsOpenDialog}
          />
        </div>
      )}

      {orderData.status === "completed" && (
        <DialogProductReview
          orderData={orderData}
          reviewDataLength={reviewDataLength}
          refetchReview={refetchReview}
        />
      )}
    </>
  );
}
