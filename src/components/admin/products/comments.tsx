import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Send, XCircle } from "lucide-react";

export default function Comments() {
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
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Add Admin Response</CardTitle>
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
            // value={newComment}
            // onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your response..."
          />
          <Button  className="flex items-center">
            <Send className="w-4 h-4 mr-2" />
            Post Response
          </Button>
        </CardContent>
      </Card>

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
    </>
  );
}
