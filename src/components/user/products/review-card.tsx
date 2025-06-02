"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Camera,
  Headphones,
  MoreVertical,
  Package,
  Star,
  ThumbsUp,
  Truck,
} from "lucide-react";
import { useState } from "react";
import StarRating from "../star-rating";
import { format } from "date-fns";
import Image from "next/image";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  DeleteLikeReview,
  GetUserLikedReview,
  PostLikeReview,
} from "@/service/shop/product-review";
import toast from "react-hot-toast";

interface ReviewProps {
  reviewData?: any;
  refetch: () => void;
  isHideLike: boolean;
}

export default function ReviewCard({
  reviewData,
  refetch,
  isHideLike,
}: ReviewProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const displayName = reviewData.displayUsername
    ? `${reviewData.user?.username}`
    : `${reviewData.user?.username.charAt(0)}***`;

  const shouldTruncate = reviewData?.content?.length > 200;
  const displayContent =
    shouldTruncate && !isExpanded
      ? reviewData.content.substring(0, 200) + "..."
      : reviewData.content;

  const {
    data: userLikedReview,
    isLoading: isLoadingLiked,
    refetch: refetchUserLikedReview,
  } = useQuery({
    queryFn: () => GetUserLikedReview(reviewData.id),
    queryKey: ["userlikedReview"],
  });

  const { mutate: likedReview } = useMutation({
    mutationFn: () => PostLikeReview(reviewData.id),
    onSuccess: () => {
      setIsLoading(false);
      toast.success("Liked Review");
      refetch();
      refetchUserLikedReview();
    },
    onError: () => {
      setIsLoading(false);
      toast.error("Failed to like review");
    },
  });

  const { mutate: unlikedReview } = useMutation({
    mutationFn: () => DeleteLikeReview(reviewData.id),
    onSuccess: () => {
      setIsLoading(false);
      toast.success("Unliked Review");
      refetch();
      refetchUserLikedReview();
    },
    onError: () => {
      setIsLoading(false);
      toast.error("Failed to unlike review");
    },
  });

  const handleLike = () => {
    setIsLoading(true);
    if (userLikedReview?.length > 0) {
      unlikedReview();
      return;
    }
    likedReview();
  };

  const getRatingColor = (rating: any) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 3.5) return "text-yellow-600";
    return "text-red-600";
  };

  if (isLoadingLiked) return <div className="spinner"></div>;

  return (
    <Card className="mb-4 hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Image
              src={reviewData?.user?.imageUrl}
              alt="Profile Picture"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-800">{displayName}</h3>
                {reviewData?.ratingProduct === 5 && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    Top Reviewer
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar size={14} />
                <span>{format(reviewData.createdAt, "dd MMMM yyyy")}</span>
                <span>•</span>
                <span className="text-blue-600 hover:underline cursor-pointer">
                  {reviewData?.product?.name}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="flex items-center gap-2 mb-1">
                <StarRating rating={reviewData?.ratingProduct} />
                <span
                  className={`text-sm font-bold ${getRatingColor(
                    reviewData?.ratingProduct
                  )}`}
                >
                  {reviewData?.ratingProduct}.0
                </span>
              </div>
            </div>
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreVertical size={16} className="text-gray-400" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100">
          <Image
            src={reviewData?.product?.images[0]?.url}
            width={100}
            height={100}
            alt={reviewData?.product?.name}
            className="w-16 h-16 rounded-xl object-cover shadow-md"
          />
          <div className="flex-1">
            <h4 className="font-semibold text-gray-800 mb-1">
              {reviewData?.product?.name}
            </h4>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Package size={14} className="text-gray-500" />
                <span className="text-gray-600">Product Quality</span>
                <StarRating rating={reviewData?.ratingProduct} size={12} />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-700 leading-relaxed text-base">
            {displayContent}
          </p>
          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-1"
            >
              {isExpanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>

        {reviewData?.photoProof && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Camera size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-600">
                Customer Photo
              </span>
            </div>
            <Image
              src={reviewData?.photoProof}
              width={200}
              height={200}
              alt="Review photo"
              className="w-40 h-40 rounded-xl object-cover cursor-pointer hover:opacity-90 transition-opacity shadow-md border border-gray-200"
            />
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-100">
            <Package size={16} className="text-green-600" />
            <div>
              <p className="text-xs text-green-700 font-medium">Product</p>
              <div className="flex items-center gap-1">
                <StarRating rating={reviewData?.ratingProduct} size={12} />
                <span className="text-sm font-semibold text-green-700">
                  {reviewData?.ratingProduct}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <Star size={16} className="text-blue-600" />
            <div>
              <p className="text-xs text-blue-700 font-medium">Shop</p>
              <div className="flex items-center gap-1">
                <StarRating rating={reviewData?.shopRating} size={12} />
                <span className="text-sm font-semibold text-blue-700">
                  {reviewData?.shopRating}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg border border-orange-100">
            <Truck size={16} className="text-orange-600" />
            <div>
              <p className="text-xs text-orange-700 font-medium">Courier</p>
              <div className="flex items-center gap-1">
                <StarRating rating={reviewData?.courierRating} size={12} />
                <span className="text-sm font-semibold text-orange-700">
                  {reviewData?.courierRating}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg border border-purple-100">
            <Headphones size={16} className="text-purple-600" />
            <div>
              <p className="text-xs text-purple-700 font-medium">Service</p>
              <div className="flex items-center gap-1">
                <StarRating rating={reviewData?.courierService} size={12} />
                <span className="text-sm font-semibold text-purple-700">
                  {reviewData?.courierService}
                </span>
              </div>
            </div>
          </div>
        </div>

        {!isHideLike && (
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                userLikedReview?.length
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <ThumbsUp
                size={16}
                className={userLikedReview?.length ? "fill-current" : ""}
              />
              <span className="text-sm font-medium">
                {reviewData?.LikedProductReview?.length} Helpful
              </span>
            </button>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Verified Purchase</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
