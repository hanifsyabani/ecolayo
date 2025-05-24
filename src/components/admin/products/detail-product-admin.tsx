"use client";

import React, { useState } from "react";
import {
  Star,
  Heart,
  ShoppingCart,
  Eye,
  Edit3,
  Trash2,
  Package,
  TrendingUp,
  MessageSquare,
  User,
  Calendar,
  DollarSign,
  BarChart3,
  Archive,
  CheckCircle,
  XCircle,
  Clock,
  Send,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { GetProductById } from "@/service/admin/products";
import Image from "next/image";
import Link from "next/link";
import { formatter } from "@/lib/utils";

export default function AdminProductDetail({ id }: any) {
  const [newComment, setNewComment] = useState("");
  const [commentRating, setCommentRating] = useState(5);

  const { data: product, isLoading: isLoadingProduct } = useQuery({
    queryFn: () => GetProductById(id),
    queryKey: ["dataProduct"],
  });

  const checkoutHistory = [
    {
      id: "co-001",
      date: "2024-03-20",
      quantity: 2,
      total: 25998000,
      status: "completed",
      customerName: "John Doe",
    },
    {
      id: "co-002",
      date: "2024-03-19",
      quantity: 1,
      total: 12999000,
      status: "completed",
      customerName: "Jane Smith",
    },
    {
      id: "co-003",
      date: "2024-03-18",
      quantity: 3,
      total: 38997000,
      status: "pending",
      customerName: "Bob Wilson",
    },
    {
      id: "co-004",
      date: "2024-03-17",
      quantity: 1,
      total: 12999000,
      status: "cancelled",
      customerName: "Alice Brown",
    },
  ];

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
    {
      id: "com-002",
      user: {
        firstName: "Jane",
        lastName: "Smith",
        imageUrl:
          "https://images.unsplash.com/photo-1494790108755-2616b332c5a0?w=40",
      },
      rating: 4,
      comment:
        "Kamera memang bagus, tapi baterai agak cepat habis untuk penggunaan heavy.",
      date: "2024-03-19",
      status: "approved",
    },
    {
      id: "com-003",
      user: {
        firstName: "Bob",
        lastName: "Wilson",
        imageUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40",
      },
      rating: 5,
      comment:
        "Worth it banget! Performa gaming smooth, foto hasilnya amazing.",
      date: "2024-03-18",
      status: "pending",
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

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      // Add comment logic here
      setNewComment("");
      setCommentRating(5);
    }
  };

  const totalRevenue = product?.CheckoutItem?.reduce((total:any, item:any) => {
    return total + (item?.checkout?.finalTotal || 0);
  }, 0);

  // Format setelah perhitungan selesai
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

  if (isLoadingProduct) return <div className="spinner"></div>;

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
                  className="flex items-center bg-red-500 text-white"
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

        {/* Tabs */}
        <Card>
          <Tabs defaultValue="overview" className="w-full">
            <CardHeader>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger
                  value="overview"
                  className="flex items-center gap-2"
                >
                  <Package className="w-4 h-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="checkouts"
                  className="flex items-center gap-2"
                >
                  <BarChart3 className="w-4 h-4" />
                  Checkout History
                </TabsTrigger>
                <TabsTrigger
                  value="comments"
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Comments & Reviews
                </TabsTrigger>
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
                  <Badge variant="outline">
                    Total: {checkoutHistory.length} checkouts
                  </Badge>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {checkoutHistory.map((checkout) => (
                      <TableRow key={checkout.id}>
                        <TableCell className="font-mono text-sm">
                          {checkout.id}
                        </TableCell>
                        <TableCell>{checkout.customerName}</TableCell>
                        <TableCell className="text-gray-600">
                          {checkout.date}
                        </TableCell>
                        <TableCell>{checkout.quantity}</TableCell>
                        <TableCell className="font-semibold text-green-600">
                          {formatter.format(checkout.total)}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(checkout.status)}>
                            {checkout.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="comments" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Comments & Reviews</h3>
                  <Badge variant="outline">{comments.length} reviews</Badge>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Add Admin Response
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Rating:</span>
                      {/* <StarRating 
                        rating={commentRating} 
                        interactive={true} 
                        onRatingChange={setCommentRating} 
                      /> */}
                    </div>
                    <Textarea
                      rows={3}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write your response..."
                    />
                    <Button
                      onClick={handleCommentSubmit}
                      className="flex items-center"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Post Response
                    </Button>
                  </CardContent>
                </Card>

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <Card key={comment.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={comment.user.imageUrl} />
                              <AvatarFallback>
                                {comment.user.firstName[0]}
                                {comment.user.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h5 className="font-semibold text-gray-900">
                                {comment.user.firstName} {comment.user.lastName}
                              </h5>
                              <div className="flex items-center space-x-2">
                                {/* <StarRating rating={comment.rating} /> */}
                                <span className="text-sm text-gray-500">
                                  {comment.date}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={getStatusVariant(comment.status)}>
                              {comment.status}
                            </Badge>
                            {comment.status === "pending" && (
                              <div className="flex space-x-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="p-1 h-auto text-green-600 hover:bg-green-100"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="p-1 h-auto text-red-600 hover:bg-red-100"
                                >
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="mt-3 text-gray-700 leading-relaxed">
                          {comment.comment}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
