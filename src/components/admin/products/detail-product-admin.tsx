"use client";

import React, { useState } from "react";
import {
  Star,
  ShoppingCart,
  Eye,
  Edit3,
  Trash2,
  Package,
  MessageSquare,
  DollarSign,
  BarChart3,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { DeleteProduct, GetProductById } from "@/service/admin/products";
import Link from "next/link";
import { formatter } from "@/lib/utils";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { GetAllOrderOneProduct } from "@/service/admin/orders";
import CheckoutHistory from "./checkout-history";
import Comments from "./comments";
import { GetAllReviewOneProduct } from "@/service/shop/product-review";
import Overview from "./overview";

export default function AdminProductDetail({ id }: any) {
  const [isDelete, setIsDelete] = useState(false);
  const router = useRouter();

  const { data: product, isLoading: isLoadingProduct } = useQuery({
    queryFn: () => GetProductById(id),
    queryKey: ["dataProduct"],
  });

  const { data: ordersHistory, isLoading: isLoadingOrders } = useQuery({
    queryFn: () => GetAllOrderOneProduct(id),
    queryKey: ["dataHistoryOrder"],
  });

  const { data: review, isLoading: isLoadingReview } = useQuery({
    queryFn: () => GetAllReviewOneProduct(id),
    queryKey: ["dataReviews"],
  });

  const { mutate: deleteproduct } = useMutation({
    mutationFn: (id: string) => DeleteProduct(id),
    onSuccess: () => {
      setIsDelete(false);
      toast.success("Product deleted successfully");
      router.push("/admin/products");
    },
    onError: () => {
      setIsDelete(false);
      toast.error("Error deleting product");
    },
  });

  function onDelete(id: string) {
    setIsDelete(true);
    deleteproduct(id);
  }

  const totalRevenue = product?.CheckoutItem?.reduce(
    (total: any, item: any) => {
      return total + (item?.checkout?.finalTotal || 0);
    },
    0
  );
  const formattedTotalRevenue = formatter.format(totalRevenue || 0);

  if (isLoadingProduct || isLoadingOrders || isLoadingReview)
    return <div className="spinner"></div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {product?.name}
                </h1>
                <p className="text-gray-600 mt-1">ID: {product?.id}</p>
              </div>
              <div className="flex space-x-3">
                <Link
                  href={`/admin/products/${product?.id}`}
                  className="flex items-center text-white"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Product
                </Link>
                <Button
                  variant="destructive"
                  className="flex items-center bg-red-500 hover:bg-red-800  text-white"
                  onClick={() => onDelete(product?.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-full">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Checkouts</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {product?.totalCheckout}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-full">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formattedTotalRevenue}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Average Rating</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {/* {}/5 */}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        <Card>
          <Tabs defaultValue="overview" className="w-full">
            <CardHeader>
              <TabsList className="grid w-full grid-cols-3">
                {[
                  { label: "Overview", value: "overview" },
                  { label: "Checkouts History", value: "checkouts" },
                  { label: "Comments", value: "comments" },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white data-[state=active]:border-green-500 hover:bg-green-50 hover:text-green-700 transition-colors"
                  >
                    {tab.label === "Overview" && (
                      <Package className="w-4 h-4" />
                    )}
                    {tab.label === "Checkouts History" && (
                      <BarChart3 className="w-4 h-4" />
                    )}
                    {tab.label === "Comments" && (
                      <MessageSquare className="w-4 h-4" />
                    )}
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </CardHeader>

            <CardContent>
              <TabsContent value="overview" className="space-y-6">
                <Overview product={product} />
              </TabsContent>

              <TabsContent value="checkouts" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Checkout History</h3>
                  <Badge variant="outline">{ordersHistory.length} orders</Badge>
                </div>
                <CheckoutHistory data={ordersHistory} />
              </TabsContent>

              <TabsContent value="comments" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Comments & Reviews</h3>
                  <Badge variant="outline">{review?.length} reviews</Badge>
                </div>

                <Comments dataReview={review} />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
