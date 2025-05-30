"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { ProductReview } from "@prisma/client";
import StarRating from "../star-rating";
import ReviewCard from "./review-card";

interface ReviewProps {
  reviewData: ProductReview;
}

const mockReviews = [
  {
    id: "1",
    content:
      "Produk sangat bagus, kualitas premium dan sesuai ekspektasi. Packaging rapi dan aman. Pengiriman cepat, kurir ramah dan profesional. Sangat puas dengan layanan toko ini!",
    photoProof:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    ratingProduct: 5,
    shopRating: 5,
    courierRating: 4,
    courierService: 5,
    displayUsername: true,
    createdAt: "2024-05-28T10:30:00Z",
    user: {
      firstName: "John",
      lastName: "Doe",
    },
    product: {
      name: "Premium Wireless Headphones",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
    },
    orderId: "ORD-2024-001",
  },
];

export default function AllReviews({ reviewData }: ReviewProps) {
  // Calculate statistics
  const totalReviews = mockReviews.length;
  const averageRating =
    mockReviews.reduce((acc, review) => acc + review.ratingProduct, 0) /
    totalReviews;
  const reviewsWithPhotos = mockReviews.filter(
    (review) => review.photoProof
  ).length;
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: mockReviews.filter((review) => review.ratingProduct === rating)
      .length,
    percentage:
      (mockReviews.filter((review) => review.ratingProduct === rating).length /
        totalReviews) *
      100,
  }));

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-800 mb-2">
              Your Reviews
            </h1>
            <p className="text-gray-600">
              What our customers are saying about their purchases
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-1">
              <StarRating rating={Math.round(averageRating)} size={20} />
              <span className="text-xl font-bold text-gray-800">
                {averageRating.toFixed(1)}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Based on {totalReviews} reviews
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
            <div className="text-2xl font-bold">{totalReviews}</div>
            <div className="text-blue-100">Total Reviews</div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
            <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
            <div className="text-green-100">Average Rating</div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
            <div className="text-2xl font-bold">{reviewsWithPhotos}</div>
            <div className="text-purple-100">With Photos</div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white">
            <div className="text-2xl font-bold">
              {Math.round(
                (mockReviews.filter((r) => r.ratingProduct >= 4).length /
                  totalReviews) *
                  100
              )}
              %
            </div>
            <div className="text-orange-100">Positive</div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold mb-4">Rating Distribution</h3>
          <div className="space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm font-medium">{rating}</span>
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
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
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <>
          <div className="text-sm text-gray-600 mb-4">
            Showing 12 of {totalReviews} reviews
          </div>
          <ReviewCard />
        </>
      </div>
    </div>
  );
}
