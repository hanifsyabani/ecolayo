'use client'

import { ProductProps } from "@/components/interface/product";

export default function Descriptions({product}: ProductProps) {
  return (
    <div className="mt-7">
      <p className="text-sm text-gray-500">{product?.description}</p>
    </div>
  )
}
