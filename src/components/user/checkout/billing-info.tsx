"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GetShippingAddress } from "@/service/shop/dashboard-user";
import {
  GetKabupatenByProvince,
  GetKecamatan,
  GetKelurahan,
  GetProvinces,
} from "@/service/shop/provinces";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

interface FormFields {
  firstName: string;
  lastName: string;
  companyName?: string;
  streetAddress: string;
  province: string;
  kabupaten: string;
  kecamatan: string;
  kelurahan: string;
  postalCode: string;
  email: string;
  phone: string;
  orderNotes?: string;
  paymentMethod: string; // Added this field to match parent component
}

interface BillingProps {
  register: UseFormRegister<FormFields>;
  setValue: UseFormSetValue<FormFields>;
  errors: FieldErrors<FormFields>;
}

export default function BillingInfo({
  register,
  setValue,
  errors,
}: BillingProps) {


  const { data: shipping, isLoading: isLoadingShipping } = useQuery({
    queryFn: () => GetShippingAddress(),
    queryKey: ["dataShippingAddress"],
  });

  useEffect(() => {
    if (shipping) {
      setValue("firstName", shipping.firstName || "");
      setValue("lastName", shipping.lastName || "");
      setValue("companyName", shipping.companyName || "");
      setValue("streetAddress", shipping.streetAddress || "");
      setValue("email", shipping.email || "");
      setValue("phone", shipping.phone || "");
      setValue("province", shipping.province || "");
      setValue("kabupaten", shipping.kabupaten || "");
      setValue("kecamatan", shipping.kecamatan || "");
      setValue("kelurahan", shipping.kelurahan || "");
      setValue("postalCode", shipping.postalCode || "");
    }
  }, [shipping, setValue]);

  if (isLoadingShipping) return <div className="spinner"></div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 ">
        <div className="w-1/2">
          <Label>First Name</Label>
          <Input id="firstName" {...register("firstName")} readOnly />
          {errors.firstName && (
            <p className="text-red-500">{errors.firstName.message}</p>
          )}
        </div>
        <div className="w-1/2">
          <Label>Last Name</Label>
          <Input id="lastName" {...register("lastName")} readOnly />
          {errors.lastName && (
            <p className="text-red-500">{errors.lastName.message}</p>
          )}
        </div>
        <div className="w-1/2">
          <Label>Company Name (optional)</Label>
          <Input id="companyName" {...register("companyName")} readOnly />
          {errors.companyName && (
            <p className="text-red-500">{errors.companyName.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label>Street Address</Label>
        <Input id="streetAddress" {...register("streetAddress")} readOnly />
        {errors.streetAddress && (
          <p className="text-red-500">{errors.streetAddress.message}</p>
        )}
      </div>
      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <Label>Province</Label>
          <Input id="province" {...register("province")} readOnly />
          {errors.province && (
            <p className="text-red-500">{errors.province.message}</p>
          )}
        </div>
        <div className="w-1/2">
          <Label>Kabupaten/Kota</Label>
          <Input id="kabupaten" {...register("kabupaten")} readOnly />
          {errors.kabupaten && (
            <p className="text-red-500">{errors.kabupaten.message}</p>
          )}
        </div>
        <div className="w-1/2">
          <Label>Kecamatan</Label>
          <Input id="kecamatan" {...register("kecamatan")} readOnly />
          {errors.kecamatan && (
            <p className="text-red-500">{errors.kecamatan.message}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <Label>Kelurahan</Label>
          <Input id="kelurahan" {...register("kelurahan")} readOnly />
          {errors.kelurahan && (
            <p className="text-red-500">{errors.kelurahan.message}</p>
          )}
        </div>
        <div className="w-1/2">
          <Label>Postal Code</Label>
          <Input id="postalCode" {...register("postalCode")} readOnly />
          {errors.postalCode && (
            <p className="text-red-500">{errors.postalCode.message}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <Label htmlFor="email">Email</Label>
          <Input  {...register("email")} readOnly />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="w-1/2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            {...register("phone")}
            readOnly
          />
          {errors.phone && (
            <p className="text-red-500">{errors.phone.message}</p>
          )}
        </div>
      </div>
      <Link href={'/shop/dashboard/settings'}>
          <p className="text-primary text-sm hover:underline mt-4">Edit Shipping Address</p>
      </Link>
    </div>
  );
}
