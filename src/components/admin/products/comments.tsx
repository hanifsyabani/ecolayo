import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import StarRating from "@/components/user/star-rating";
import { format } from "date-fns";
import { Camera, CheckCircle, Headphones, Package, Send, Star, Truck, XCircle } from "lucide-react";
import Image from "next/image";

interface DataReviewProps {
  dataReview: any;
}

export default function Comments({ dataReview }: DataReviewProps) {
  const comments = [
    {
      id: "com-001",
      user: {
        firstName: "John",
        lastName: "Doe",
        imageUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40",
      },
      rating: 5,
      comment:
        "Produk sangat bagus, kualitas premium dan sesuai deskripsi. Pengiriman cepat!",
      date: "2024-03-20",
      status: "approved",
    },
  ];
  const getStatusVariant = (status: any) => {
    switch (status) {
      case "completed":
      case "approved":
        return "default";
      case "pending":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Add Admin Response</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea rows={3} placeholder="Write your response..." />
          <Button className="flex items-center text-white">
            <Send className="w-4 h-4 mr-2" />
            Post Response
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {dataReview.map((comment: any) => (
          <Card key={comment.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={comment?.user?.imageUrl} />
                    <AvatarFallback>
                      {comment?.user?.firstName}
                      {comment?.user?.lastName}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h5 className="font-semibold text-gray-900">
                      {comment?.user?.firstName} {comment?.user?.lastName}
                      {comment?.user?.username}
                    </h5>
                    <div className="flex items-center space-x-2">
                      {/* <StarRating rating={comment?.rating} /> */}
                      <span className="text-sm text-gray-500">
                        {format(comment?.createdAt, "dd MMMM yyyy")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-gray-700 leading-relaxed">
                {comment?.content}
              </p>

              {dataReview?.photoProof && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Camera size={16} className="text-gray-500" />
                    <span className="text-sm font-medium text-gray-600">
                      Customer Photo
                    </span>
                  </div>
                  <Image
                    src={dataReview?.photoProof}
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
                    <p className="text-xs text-green-700 font-medium">
                      Product
                    </p>
                    <div className="flex items-center gap-1">
                      <StarRating
                        rating={comment?.ratingProduct}
                        size={12}
                      />
                      <span className="text-sm font-semibold text-green-700">
                        {comment?.ratingProduct}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <Star size={16} className="text-blue-600" />
                  <div>
                    <p className="text-xs text-blue-700 font-medium">Shop</p>
                    <div className="flex items-center gap-1">
                      <StarRating rating={comment?.shopRating} size={12} />
                      <span className="text-sm font-semibold text-blue-700">
                        {comment?.shopRating}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg border border-orange-100">
                  <Truck size={16} className="text-orange-600" />
                  <div>
                    <p className="text-xs text-orange-700 font-medium">
                      Courier
                    </p>
                    <div className="flex items-center gap-1">
                      <StarRating
                        rating={comment?.courierRating}
                        size={12}
                      />
                      <span className="text-sm font-semibold text-orange-700">
                        {comment?.courierRating}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <Headphones size={16} className="text-purple-600" />
                  <div>
                    <p className="text-xs text-purple-700 font-medium">
                      Service
                    </p>
                    <div className="flex items-center gap-1">
                      <StarRating
                        rating={comment?.courierService}
                        size={12}
                      />
                      <span className="text-sm font-semibold text-purple-700">
                        {comment?.courierService}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
