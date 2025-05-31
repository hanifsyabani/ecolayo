'use client'

import { useQuery } from "@tanstack/react-query";
import AllReviews from "./review";
import { GetAllReviewOneProduct } from "@/service/shop/product-review";

interface CustomerCommentProp{
  productId : string
}

export default function CustomerComment({productId}: CustomerCommentProp) {
  const {data: allReviews, isLoading: isLoadingReview } = useQuery({
    queryFn: () => GetAllReviewOneProduct(productId),
    queryKey: ["dataReviews"],
  })

  if(isLoadingReview) return <div className="spinner"></div>
  return (
    <div className="mt-4">
      <AllReviews reviewData={allReviews} />
    </div>
  )
}
