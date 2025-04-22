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
import { GetDistrictByProvince, GetProvinces } from "@/service/shop/provinces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  companyName: z.string().optional(),
  streetAddress: z.string().min(1),
  province: z.string().min(1),
  district: z.string().min(1),
  postalCode: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
});
type FormFields = z.infer<typeof schema>;

export default function BillingInfo() {
  const [selectedProvince, setSelectedProvince] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const { data: provinces, isLoading: isLoadingProvinces } = useQuery({
    queryFn: () => GetProvinces(),
    queryKey: ["dataProvinces"],
  });
  const { data: districks, isLoading: isLoadingDistricts } = useQuery({
    queryFn: () => GetDistrictByProvince(selectedProvince),
    queryKey: ["dataDistricts", selectedProvince],
    enabled: !!selectedProvince,
  });

  if (isLoadingProvinces) return <div className="spinner"></div>;

  return (
    <form className="space-y-4">
      <div className="flex items-center gap-4 ">
        <div className="w-1/2">
          <Label>First Name</Label>
          <Input
            id="firstName"
            {...register("firstName")}
            placeholder="Your first name"
          />
        </div>
        <div className="w-1/2">
          <Label>Last Name</Label>
          <Input
            id="lastName"
            {...register("lastName")}
            placeholder="Your last name"
          />
        </div>
        <div className="w-1/2">
          <Label>Company Name (optional)</Label>
          <Input
            id="companyName"
            {...register("companyName")}
            placeholder="Your company name"
          />
        </div>
      </div>

      <div>
        <Label>Street Address</Label>
        <Input
          id="streetAddress"
          {...register("streetAddress")}
          placeholder="Your street address"
        />
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
        </div>
        <div className="w-1/2">
          <Label>District</Label>
          <Select onValueChange={(e) => setValue("district", e)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a states" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {districks?.map((district: any) => (
                <SelectItem
                  value={district.name}
                  key={district.code}
                  className="hover:bg-gray-200 cursor-pointer"
                >
                  {district.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-1/2">
          <Label>Postal Code</Label>
          <Input
            id="postalCode"
            {...register("postalCode")}
            placeholder="Your zip code/postal code"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <Label htmlFor="email">Email</Label>
          <Input placeholder="Your email" {...register("email")} />
        </div>
        <div className="w-1/2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            placeholder="Your phone number"
            {...register("phone")}
          />
        </div>
      </div>
    </form>
  );
}
