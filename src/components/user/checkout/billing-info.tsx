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
import {
  GetKabupatenByProvince,
  GetKecamatan,
  GetKelurahan,
  GetProvinces,
} from "@/service/shop/provinces";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FieldErrors,  UseFormRegister, UseFormSetValue } from "react-hook-form";


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

export default function BillingInfo({register, setValue, errors}: BillingProps) {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedKabupaten, setSelectedKabupaten] = useState("");
  const [selectedKecamatan, setSelectedKecamatan] = useState("");
  const [selectedKelurahan, setSelectedKelurahan] = useState("");

  const { data: provinces, isLoading: isLoadingProvinces } = useQuery({
    queryFn: () => GetProvinces(),
    queryKey: ["dataProvinces"],
  });
  const { data: kabupaten, isLoading: isLoadingKabupaten } = useQuery({
    queryFn: () => GetKabupatenByProvince(selectedProvince),
    queryKey: ["dataKabupaten", selectedProvince],
    enabled: !!selectedProvince,
  });
  const { data: kecamatan, isLoading: isLoadingKecamatan } = useQuery({
    queryFn: () => GetKecamatan(selectedKabupaten),
    queryKey: ["dataKecamatan", selectedKabupaten],
    enabled: !!selectedKabupaten,
  });
  const { data: kelurahan, isLoading: isLoadingKelurahan } = useQuery({
    queryFn: () => GetKelurahan(selectedKecamatan),
    queryKey: ["dataKelurahan", selectedKecamatan],
    enabled: !!selectedKecamatan,
  });

  if (isLoadingProvinces || isLoadingKabupaten || isLoadingKecamatan || isLoadingKelurahan) return <div className="spinner"></div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 ">
        <div className="w-1/2">
          <Label>First Name</Label>
          <Input
            id="firstName"
            {...register("firstName")}
            placeholder="Your first name"
          />
          {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
        </div>
        <div className="w-1/2">
          <Label>Last Name</Label>
          <Input
            id="lastName"
            {...register("lastName")}
            placeholder="Your last name"
          />
          {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
        </div>
        <div className="w-1/2">
          <Label>Company Name (optional)</Label>
          <Input
            id="companyName"
            {...register("companyName")}
            placeholder="Your company name"
          />
          {errors.companyName && <p className="text-red-500">{errors.companyName.message}</p>}
        </div>
      </div>

      <div>
        <Label>Street Address</Label>
        <Input
          id="streetAddress"
          {...register("streetAddress")}
          placeholder="Your street address"
        />
        {errors.streetAddress && <p className="text-red-500">{errors.streetAddress.message}</p>}
      </div>
      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <Label>Province</Label>
          <Select
            onValueChange={(selected) => {
              const selectedProvince = provinces.find(
                (prov: any) => prov.name === selected
              );
              setSelectedProvince(selectedProvince?.code);
              setValue("province", selected);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a province" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {provinces?.map((province: any) => (
                <SelectItem
                  value={province.name}
                  key={province.code}
                  className="hover:bg-gray-200  cursor-pointer"
                >
                  {province.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.province && <p className="text-red-500">{errors.province.message}</p>}
        </div>
        <div className="w-1/2">
          <Label>Kabupaten/Kota</Label>
          <Select
            onValueChange={(selected) => {
              const selectedKabupaten = kabupaten.find(
                (kab: any) => kab.name === selected
              );
              setSelectedKabupaten(selectedKabupaten?.code);
              setValue("kabupaten", selected);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select kabupaten" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {isLoadingKabupaten ? (
                <span className="spinner" />
              ) : (
                kabupaten?.map((district: any) => (
                  <SelectItem
                    value={district.name}
                    key={district.code}
                    className="hover:bg-gray-200 cursor-pointer"
                  >
                    {district.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          {errors.kabupaten && <p className="text-red-500">{errors.kabupaten.message}</p>}
        </div>
        <div className="w-1/2">
          <Label>Kecamatan</Label>
          <Select
            onValueChange={(selected) => {
              const selectedKecamatan = kecamatan.find(
                (kec: any) => kec.name === selected
              );
              setSelectedKecamatan(selectedKecamatan?.code);
              setValue("kecamatan", selected);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select kecamatan" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {isLoadingKecamatan ? (
                <span className="spinner" />
              ) : (
                kecamatan?.map((kec: any) => (
                  <SelectItem
                    value={kec.name}
                    key={kec.code}
                    className="hover:bg-gray-200 cursor-pointer"
                  >
                    {kec.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          {errors.kecamatan && <p className="text-red-500">{errors.kecamatan.message}</p>}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <Label>Kelurahan</Label>
          <Select
            onValueChange={(selected) => {
              const selectedKelurahan = kelurahan.find(
                (kel: any) => kel.name === selected
              );
              setSelectedKelurahan(selectedKelurahan?.postal_code);
              setValue("kelurahan", selected);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select kelurahan" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {kelurahan?.map((kel: any) => (
                <SelectItem
                  value={kel.name}
                  key={kel.code}
                  className="hover:bg-gray-200 cursor-pointer"
                >
                  {kel.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.kelurahan && <p className="text-red-500">{errors.kelurahan.message}</p>}
        </div>
        <div className="w-1/2">
          <Label>Postal Code</Label>
          <Select onValueChange={(e) => setValue("postalCode", e)}>
            <SelectTrigger>
              <SelectValue placeholder="Select postal code" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {selectedKelurahan && (
                <SelectItem
                  value={selectedKelurahan}
                  className="hover:bg-gray-200 cursor-pointer"
                >
                  {selectedKelurahan}
                </SelectItem>
              )}
            </SelectContent>
          </Select>
          {errors.postalCode && <p className="text-red-500">{errors.postalCode.message}</p>}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <Label htmlFor="email">Email</Label>
          <Input placeholder="Your email" {...register("email")} />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div className="w-1/2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            placeholder="Your phone number"
            {...register("phone")}
          />
          {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
        </div>
      </div>
    </div>
  );
}
