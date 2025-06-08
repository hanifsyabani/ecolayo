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
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  const {
    data: shipping,
    isLoading: isLoadingShipping,
    refetch,
  } = useQuery({
    queryFn: () => GetShippingAddress(),
    queryKey: ["dataShippingAddress"],
  });

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
      setIsLoading(false);
      const message = error?.message || "Error update shipping address";
      toast.error(message);
    },
  });

  function onSubmit(data: FormFields) {
    setIsLoading(true);
    if (shipping) {
      updateShipping(data);
    } else {
      postShipping(data);
    }
  }

  const findPostalCode = (name: string) => {
    if (!kelurahan) return "";
    const kel = kelurahan.find((k: any) => k.name === name);
    return kel?.postal_code || "";
  };

  useEffect(() => {
    if (shipping && provinces && !initialDataLoaded) {
      setValue("firstName", shipping.firstName || "");
      setValue("lastName", shipping.lastName || "");
      setValue("companyName", shipping.companyName || "");
      setValue("streetAddress", shipping.streetAddress || "");
      setValue("email", shipping.email || "");
      setValue("phone", shipping.phone || "");
      
      if (shipping.province) {
        setValue("province", shipping.province);
        const province = provinces.find((province: any) => province.name === shipping.province);
        setSelectedProvince(province?.code);
      }
    }
  }, [shipping, provinces, setValue, initialDataLoaded]);

  useEffect(() => {
    if (shipping && kabupaten && selectedProvince) {
      if (shipping.kabupaten) {
        setValue("kabupaten", shipping.kabupaten);
        const kabupatenCode = kabupaten.find((kabupaten: any) => kabupaten.name === shipping.kabupaten);
        setSelectedKabupaten(kabupatenCode?.code);
      }
    }
  }, [shipping, kabupaten, selectedProvince, setValue]);

  useEffect(() => {
    if (shipping && kecamatan && selectedKabupaten) {
      if (shipping.kecamatan) {
        setValue("kecamatan", shipping.kecamatan);
        const kecamatanCode = kecamatan.find((kec :any) => kec.name === shipping.kecamatan);
        setSelectedKecamatan(kecamatanCode?.code);
      }
    }
  }, [shipping, kecamatan, selectedKabupaten, setValue]);

  useEffect(() => {
    if (shipping && kelurahan && selectedKecamatan) {
      if (shipping.kelurahan) {
        setValue("kelurahan", shipping.kelurahan);
        const postalCode = findPostalCode(shipping.kelurahan);
        setValue("postalCode", postalCode);
        setSelectedKelurahan(postalCode);
        setInitialDataLoaded(true);
      }
    }
  }, [shipping, kelurahan, selectedKecamatan, setValue]);

  useEffect(() => {
    if (selectedKelurahan) {
      setValue("postalCode", selectedKelurahan);
    }
  }, [selectedKelurahan, setValue]);

  if (isLoadingShipping) return <div className="spinner"></div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4 mt-4">
        <div className="lg:flex items-center gap-4 space-y-4 lg:space-y-0 ">
          <div className="lg:w-1/2">
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
          <div className="lg:w-1/2">
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
          <div className="lg:w-1/2">
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
        <div className="lg:flex items-center gap-4 space-y-4 lg:space-y-0">
          <div className="lg:w-1/2">
            <Label>Province</Label>
            <Select
              onValueChange={(selected) => {
                const selectedProvince = provinces.find(
                  (prov: any) => prov.name === selected
                );
                setSelectedProvince(selectedProvince?.code);
                setValue("province", selected);
                setSelectedKabupaten("");
                setSelectedKecamatan("");
                setSelectedKelurahan("");
                setValue("kabupaten", "");
                setValue("kecamatan", "");
                setValue("kelurahan", "");
                setValue("postalCode", "");
              }}
              defaultValue={shipping?.province || ""}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a province" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {provinces?.map((province: any) => (
                  <SelectItem
                    value={province.name}
                    key={province.code}
                    className="hover:bg-gray-200 cursor-pointer"
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
          <div className="lg:w-1/2">
            <Label>Kabupaten/Kota</Label>
            <Select
              onValueChange={(selected) => {
                const selectedKabupaten = kabupaten?.find(
                  (kab: any) => kab.name === selected
                );
                setSelectedKabupaten(selectedKabupaten?.code);
                setValue("kabupaten", selected);
                setSelectedKecamatan("");
                setSelectedKelurahan("");
                setValue("kecamatan", "");
                setValue("kelurahan", "");
                setValue("postalCode", "");
              }}
              defaultValue={shipping?.kabupaten || ""}
              disabled={!selectedProvince}
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
          <div className="lg:w-1/2">
            <Label>Kecamatan</Label>
            <Select
              onValueChange={(selected) => {
                const selectedKecamatan = kecamatan?.find(
                  (kec: any) => kec.name === selected
                );
                setSelectedKecamatan(selectedKecamatan?.code);
                setValue("kecamatan", selected);
                // Reset dependent fields
                setSelectedKelurahan("");
                setValue("kelurahan", "");
                setValue("postalCode", "");
              }}
              defaultValue={shipping?.kecamatan || ""}
              disabled={!selectedKabupaten}
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

        <div className="lg:flex items-center gap-4">
          <div className="lg:w-1/2">
            <Label>Kelurahan</Label>
            <Select
              onValueChange={(selected) => {
                const selectedKel = kelurahan?.find(
                  (kel: any) => kel.name === selected
                );
                setSelectedKelurahan(selectedKel?.postal_code);
                setValue("kelurahan", selected);
                setValue("postalCode", selectedKel?.postal_code || "");
              }}
              defaultValue={shipping?.kelurahan || ""}
              disabled={!selectedKecamatan}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select kelurahan" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {isLoadingKelurahan ? (
                  <span className="spinner" />
                ) : (
                  kelurahan?.map((kel: any) => (
                    <SelectItem
                      value={kel.name}
                      key={kel.code}
                      className="hover:bg-gray-200 cursor-pointer"
                    >
                      {kel.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            {errors.kelurahan && (
              <p className="text-red-500">{errors.kelurahan.message}</p>
            )}
          </div>
          <div className="lg:w-1/2">
            <Label>Postal Code</Label>
            <Input
              id="postalCode"
              {...register("postalCode")}
              readOnly
              value={watch("postalCode") || ""}
            />
            {errors.postalCode && (
              <p className="text-red-500">{errors.postalCode.message}</p>
            )}
          </div>
        </div>

        <div className="lg:flex items-center gap-4">
          <div className="lg:w-1/2">
            <Label htmlFor="email">Email</Label>
            <Input placeholder="Your email" {...register("email")} />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="lg:w-1/2">
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