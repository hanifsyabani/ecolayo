"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

interface UploadImageProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

export default function UploadImage(props: UploadImageProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  function onUpload(result: any) {
    const imageUrl = result?.info?.secure_url;

    if (!imageUrl) {
      toast.error("Image upload failed");
      return;
    }

    setUploadedImage(imageUrl);

    // console.log("Calling onChange with:", imageUrl);
    props.onChange(imageUrl);
  }

  if (!isMounted) return null;

  const displayValues =
    props.value.length > 0 ? props.value : uploadedImage ? [uploadedImage] : [];

  return (
    <div className="mt-2">
      {displayValues.map((url, i) => (
        <div key={i} className="w-[200px] h-[200px] relative">
          <Button
            onClick={() => {
              props.onRemove(url);
              setUploadedImage(null);
            }}
            variant="destructive"
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full z-10"
          >
            <Trash size={20} />
          </Button>
          {url && (
            <div className="relative w-[200px] h-[200px]">
              <Image
                src={url}
                alt="Uploaded image"
                fill
                className="object-cover rounded-md"
              />
            </div>
          )}
        </div>
      ))}

      {displayValues.length === 0 && (
        <Button
          asChild
          disabled={props.disabled}
          className="text-white"
          variant="secondary"
        >
          <CldUploadButton uploadPreset="ecoshop" onSuccess={onUpload}>
            Upload Image
          </CldUploadButton>
        </Button>
      )}
    </div>
  );
}
