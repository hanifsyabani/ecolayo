"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, Camera, Upload } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  PostProductReview,
} from "@/service/shop/product-review";
import { zodResolver } from "@hookform/resolvers/zod";
import UploadImage from "@/components/admin/banner/upload-image";

interface DialogPenilaianProps {
  orderData?: any;
  reviewDataLength?: any;
  refetchReview: () => void;
}

const schema = z.object({
  content: z.string(),
  ratingProduct: z.number(),
  photoProof: z.string().optional(),
  shopRating: z.number(),
  courierRating: z.number(),
  courierService: z.number(),
  displayUsername: z.boolean(),
});
type FormFields = z.infer<typeof schema>;

export default function DialogProductReview({
  orderData,
  reviewDataLength,
  refetchReview
}: DialogPenilaianProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const productId = orderData?.items[0]?.productId;

  const { mutate: submitReview } = useMutation({
    mutationFn: (data: FormFields) =>
      PostProductReview(data, productId, orderData.id),
    onSuccess: () => {
      setIsLoading(false);
      toast.success("Review sent successfully!, Thanks for your feedback!");
      setIsOpen(false);
      refetchReview();
    },
    onError: () => {
      setIsLoading(false);
      toast.error("Review failed to send!, Please try again!");
    },
  });

  const StarRating = ({
    name,
    label,
  }: {
    name: keyof FormFields;
    label: string;
  }) => {
    const currentValue = watch(name) || 0;
    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium">{label}</Label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star: any) => (
            <Star
              key={star}
              className={`w-6 h-6 cursor-pointer transition-colors ${
                star <= currentValue
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300 hover:text-yellow-400"
              }`}
              onClick={() => setValue(name, star)}
            />
          ))}
        </div>
      </div>
    );
  };

  function onSubmit(data: FormFields) {
    setIsLoading(true);
    submitReview(data);
  }


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {reviewDataLength === 0 && (
          <div className="flex justify-center my-10">
            <Button className="text-white">Berikan Penilaian</Button>
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Penilaian Produk & Layanan
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <StarRating name="ratingProduct" label="Penilaian Produk" />
          <StarRating name="shopRating" label="Penilaian Toko" />
          <StarRating name="courierRating" label="Penilaian Kurir" />
          <StarRating name="courierService" label="Penilaian Layanan Kurir" />

          <div className="space-y-2">
            <Label htmlFor="review-comment" className="text-sm font-medium">
              Komentar Review
            </Label>
            <Textarea
              id="review-comment"
              placeholder="Bagikan pengalaman Anda dengan produk ini..."
              rows={4}
              {...register("content")}
              className="border-2 resize-none"
            />
            {errors.content && (
              <p className="text-sm text-red-500">{errors.content.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Foto Bukti (Opsional)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <div className="text-center">
                <Camera className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <div className="flex justify-center">
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <div className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-500">
                      <Upload className="h-4 w-4" />
                      Upload Foto
                    </div>
                    <UploadImage
                      value={[getValues("photoProof") ?? ""].filter(Boolean)}
                      onChange={(urls) => setValue("photoProof", urls[0] || "")}
                      onRemove={() => setValue("photoProof", "")}
                    />
                  </label>
                </div>
                {errors.photoProof && (
                  <p className="text-sm text-red-500">
                    {errors.photoProof.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="display-username"
              onCheckedChange={(checked) =>
                setValue("displayUsername", Boolean(checked))
              }
              checked={watch("displayUsername")}
            />
            <Label
              htmlFor="display-username"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Tampilkan username saya pada review ini
            </Label>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isLoading} className="text-white">
              {isLoading ? (
                <span className="spinner"></span>
              ) : (
                "Berikan Penilaian"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
