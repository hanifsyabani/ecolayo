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
import Image from "next/image";
import Link from "next/link";
import { formatter } from "@/lib/utils";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { GetAllOrderOneProduct } from "@/service/admin/orders";
import CheckoutHistory from "./checkout-history";
import Comments from "./comments";

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

  //   const StarRating = ({ rating, interactive = false, onRatingChange }) => (
  //   <div className="flex items-center">
  //     {[1, 2, 3, 4, 5].map((star) => (
  //       <button
  //         key={star}
  //         onClick={interactive ? () => onRatingChange(star) : undefined}
  //         className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
  //         disabled={!interactive}
  //       >
  //         <Star
  //           className={`w-4 h-4 ${
  //             star <= Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
  //           }`}
  //         />
  //       </button>
  //     ))}
  //   </div>
  // );

  if (isLoadingProduct || isLoadingOrders)
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

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Eye className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">View Count</p>
                  <p className="text-2xl font-bold text-gray-900">{/* {} */}</p>
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
                    className="flex items-center gap-2 data-[state=active]:bg-green-500 data-[state=active]:text-white data-[state=active]:border-green-500 hover:bg-green-50 hover:text-green-700 transition-colors"
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Product Images
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {product?.images?.map((image: any, index: number) => (
                        <div key={image.id} className="relative group">
                          <Image
                            src={image.url}
                            width={200}
                            height={200}
                            alt={`Product ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all flex items-center justify-center">
                            <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Product Details
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-600">Price</span>
                        <span className="font-semibold text-lg text-green-600">
                          {formatter.format(product?.price)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-600">Stock</span>
                        <Badge
                          variant={
                            product?.stock > 10 ? "default" : "destructive"
                          }
                        >
                          {product?.stock} units
                        </Badge>
                      </div>

                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-600">Category</span>
                        <Badge variant="outline">
                          {product?.category.name}
                        </Badge>
                      </div>

                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-600">Rating</span>
                        <div className="flex items-center space-x-2">
                          {/* <StarRating rating={product.stars} /> */}
                          <span className="font-semibold">
                            {product?.stars}/5
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-600">Status</span>
                        <div className="flex space-x-2">
                          {product?.isFeatured && <Badge>Featured</Badge>}
                          <Badge
                            variant={
                              product?.isArchived ? "destructive" : "default"
                            }
                          >
                            {product?.isArchived ? "Archived" : "Active"}
                          </Badge>
                        </div>
                      </div>

                      <div className="py-3">
                        <span className="text-gray-600 block mb-2">Tags</span>
                        <div className="flex flex-wrap gap-2">
                          {product?.tags?.map((tag: any, index: number) => (
                            <Badge key={index} variant="secondary">
                              {tag.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-semibold mb-2">Description</h4>
                      <p className="text-gray-600 leading-relaxed">
                        {product?.description}
                      </p>
                    </div>
                  </div>
                </div>
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
                  <Badge variant="outline">{} reviews</Badge>
                </div>

                <Comments />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
