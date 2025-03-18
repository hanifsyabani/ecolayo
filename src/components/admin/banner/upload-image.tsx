"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { Trash, Plus } from "lucide-react";
import toast from "react-hot-toast";

interface UploadImageProps {
  disabled?: boolean;
  onChange: (value: string[]) => void;
  onRemove: (value: string) => void;
  value: string[];
}

export default function UploadImage(props: UploadImageProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  function onUpload(result: any) {
    const imageUrl = result?.info?.secure_url;

    if (!imageUrl) {
      toast.error("Image upload failed");
      return;
    }

    // Add the new image URL to the existing array
    const updatedImages = [...props.value, imageUrl];
    props.onChange(updatedImages);
  }

  if (!isMounted) return null;

  return (
    <div className="mt-2">
      <div className="flex flex-wrap gap-4 max-h-[400px] overflow-y-auto p-2">
        {props.value.map((url, i) => (
          <div key={i} className="w-[200px] h-[200px] relative">
            <Button
              onClick={() => props.onRemove(url)}
              variant="destructive"
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full z-10"
            >
              <Trash size={20} />
            </Button>
            {url && (
              <div className="w-[200px] h-[200px]">
                <Image
                  src={url}
                  alt="Uploaded image"
                  width={200}
                  height={200}
                  className="object-cover rounded-md"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <Button
        asChild
        disabled={props.disabled}
        className="text-white mt-4"
        variant="secondary"
      >
        <CldUploadButton uploadPreset="ecoshop" onSuccess={onUpload}>
          <Plus className="mr-2" size={16} />
          Add Image
        </CldUploadButton>
      </Button>
    </div>
  );
}