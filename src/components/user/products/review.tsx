"use client";

import { Star } from "lucide-react";
import StarRating from "../star-rating";
import ReviewCard from "./review-card";

interface ReviewProps {
  reviewData: any;
  refetch: () => void;
}

export default function AllReviews({ reviewData, refetch }: ReviewProps) {
  const totalReviews = reviewData?.length;
  const averageRating =
    reviewData?.reduce(
      (acc: any, review: any) => acc + review.ratingProduct,
      0
    ) / totalReviews;

  const reviewsWithPhotos = reviewData?.filter(
    (review: any) => review.photoProof
  ).length;

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviewData?.filter((review: any) => review.ratingProduct === rating)
      .length,
    percentage:
      (reviewData?.filter((review: any) => review.ratingProduct === rating)
        .length /
        totalReviews) *
      100,
  }));

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-800 mb-2">
              Reviews Product
            </h1>
            <p className="text-gray-600">
              What our customers are saying about their purchases
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-1">
              <StarRating rating={Math.round(averageRating)} size={20} />
              <span className="text-xl font-bold text-gray-800">
                {totalReviews == 0 ? 0 : averageRating.toFixed(1)}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Based on {totalReviews} reviews
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
            <div className="text-2xl font-bold">{totalReviews}</div>
            <div className="text-blue-100">Total Reviews</div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
            <div className="text-2xl font-bold">{totalReviews == 0 ? 0  : averageRating.toFixed(1) }</div>
            <div className="text-green-100">Average Rating</div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
            <div className="text-2xl font-bold">{reviewsWithPhotos}</div>
            <div className="text-purple-100">With Photos</div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white">
            <div className="text-2xl font-bold">
              {totalReviews == 0 ? 0 : Math.round(
                (reviewData?.filter((r: any) => r.ratingProduct >= 4).length /
                  totalReviews) *
                  100
              )}
              %
            </div>
            <div className="text-orange-100">Positive</div>
          </div>
        </div>

        {reviewData?.length === 0 ? (
          <div className="text-center text-gray-600 mt-10">
            No reviews found for this product
          </div>
        ) : (
          <div className="bg-white p-6 rounded-xl border border-gray-200 mb-6">
            <h3 className="text-lg font-semibold mb-4">Rating Distribution</h3>
            <div className="space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm font-medium">{rating}</span>
                    <Star
                      size={14}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {reviewData.map((review: any) => (
          <ReviewCard
            reviewData={review}
            key={review.id}
            refetch={refetch}
            isHideLike={false}
          />
        ))}
      </div>
    </div>
  );
}
