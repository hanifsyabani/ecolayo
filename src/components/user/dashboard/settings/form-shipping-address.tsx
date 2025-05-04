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
import {
  GetShippingAddress,
  PatchShippingAddress,
  PostShippingAddress,
} from "@/service/shop/dashboard-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  companyName: z.string().optional(),
  streetAddress: z.string(),
  province: z.string(),
  kabupaten: z.string(),
  kecamatan: z.string(),
  kelurahan: z.string(),
  postalCode: z.string(),
  email: z.string().email(),
  phone: z.string(),
});
type FormFields = z.infer<typeof schema>;

export default function FormShippingAddress() {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedKabupaten, setSelectedKabupaten] = useState("");
  const [selectedKecamatan, setSelectedKecamatan] = useState("");
  const [selectedKelurahan, setSelectedKelurahan] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const {
    data: shipping,
    isLoading: isLoadingShipping,
    refetch,
  } = useQuery({
    queryFn: () => GetShippingAddress(),
    queryKey: ["dataShippingAddress"],
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const { mutate: postShipping } = useMutation({
    mutationFn: (data: FormFields) => PostShippingAddress(data),
    onSuccess: () => {
      setIsLoading(false);
      toast.success("Shipping address create successfully");
      refetch();
    },
    onError: (error: any) => {
      // console.log(error?.error)
      setIsLoading(false);
      const message = error?.message || "Error create shipping address";
      toast.error(message);
    },
  });

  const { mutate: updateShipping } = useMutation({
    mutationFn: (data: FormFields) => PatchShippingAddress(data),
    onSuccess: () => {
      setIsLoading(false);
      toast.success("Shipping address updated successfully");
      refetch();
    },
    onError: (error: any) => {
      // console.log(error?.error)
      setIsLoading(false);
      const message = error?.message || "Error update shipping address";
      toast.error(message);
    },
  });

  function onSubmit(data: FormFields) {
    setIsLoading(true);
    // updateShipping(data);
    postShipping(data);
  }

  useEffect(() => {
    if (shipping) {
      setValue("firstName", shipping.firstName);
      setValue("lastName", shipping.lastName);
      setValue("companyName", shipping.companyName);
      setValue("streetAddress", shipping.streetAddress);
      setValue("postalCode", shipping.postalCode);
      setValue("email", shipping.email);
      setValue("phone", shipping.phone);
    }
  }, [shipping, setValue]);

  if (isLoadingShipping) return <div className="spinner"></div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4 mt-4">
        <div className="flex items-center gap-4 ">
          <div className="w-1/2">
            <Label>First Name</Label>
            <Input
              id="firstName"
              {...register("firstName")}
              placeholder="Your first name"
            />
            {errors.firstName && (
              <p className="text-red-500">{errors.firstName.message}</p>
            )}
          </div>
          <div className="w-1/2">
            <Label>Last Name</Label>
            <Input
              id="lastName"
              {...register("lastName")}
              placeholder="Your last name"
            />
            {errors.lastName && (
              <p className="text-red-500">{errors.lastName.message}</p>
            )}
          </div>
          <div className="w-1/2">
            <Label>Company Name (optional)</Label>
            <Input
              id="companyName"
              {...register("companyName")}
              placeholder="Your company name"
            />
            {errors.companyName && (
              <p className="text-red-500">{errors.companyName.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label>Street Address</Label>
          <Input
            id="streetAddress"
            {...register("streetAddress")}
            placeholder="Your street address"
          />
          {errors.streetAddress && (
            <p className="text-red-500">{errors.streetAddress.message}</p>
          )}
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
              value={watch("province")}
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
            {errors.province && (
              <p className="text-red-500">{errors.province.message}</p>
            )}
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
              value={selectedKabupaten}
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
            {errors.kabupaten && (
              <p className="text-red-500">{errors.kabupaten.message}</p>
            )}
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
              value={shipping?.kecamatan}
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
            {errors.kecamatan && (
              <p className="text-red-500">{errors.kecamatan.message}</p>
            )}
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
              value={shipping?.kelurahan}
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
            {errors.kelurahan && (
              <p className="text-red-500">{errors.kelurahan.message}</p>
            )}
          </div>
          <div className="w-1/2">
            <Label>Postal Code</Label>
            <Input
              id="postalCode"
              {...register("postalCode")}
              readOnly
            />
            {errors.postalCode && (
              <p className="text-red-500">{errors.postalCode.message}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-1/2">
            <Label htmlFor="email">Email</Label>
            <Input placeholder="Your email" {...register("email")} />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="w-1/2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              placeholder="Your phone number"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6 text-white">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <span className="spinner" /> : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
