import { Badge } from "@/components/ui/badge";
import { formatter } from "@/lib/utils";
import {  Eye } from "lucide-react";
import Image from "next/image";

export default function Overview({ product }: any) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Product Images</h3>
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
        <h3 className="text-lg font-semibold mb-4">Product Details</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-600">Price</span>
            <span className="font-semibold text-lg text-green-600">
              {formatter.format(product?.price)}
            </span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-600">Stock</span>
            <Badge variant={product?.stock > 10 ? "default" : "destructive"} className="text-white">
              {product?.stock} units
            </Badge>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-600">Category</span>
            <Badge variant="outline" className="text-secondary outline-primary">{product?.category.name}</Badge>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-600">Rating</span>
            <div className="flex items-center space-x-2">
              {/* <StarRating rating={product.stars} /> */}
              <span className="font-semibold">{product?.stars}/5</span>
            </div>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-600">Status</span>
            <div className="flex space-x-2">
              {product?.isFeatured && <Badge className="text-white">Featured</Badge>}
              <Badge variant={product?.isArchived ? "destructive" : "default"} className="text-white">
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
  );
}
