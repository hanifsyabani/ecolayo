'use client'

import { Copy, Server } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Badge, BadgeProps } from "./badge";
import toast from "react-hot-toast";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

export default function ApiAlert({
  title,
  description,
  variant = "public",
}: ApiAlertProps) {

  function onCopy(){
    navigator.clipboard.writeText(description);
    toast.success("API Successfully copied");
  }

  return (
    <>
      <Alert>
        <Server size={20} />
        <AlertTitle className="flex gap-2 items-center">
          {title}
          <Badge variant={variantMap[variant]} className="text-white bg-gray-600">{textMap[variant]}</Badge>
        </AlertTitle>
        <AlertDescription className="flex justify-between items-center">
          <code>{description}</code>
          <Copy size={20} onClick={onCopy} className="cursor-pointer"/>
        </AlertDescription>
      </Alert>
    </>
  );
}
