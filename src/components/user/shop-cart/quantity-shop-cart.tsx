"use client";

import { FaMinus, FaPlus } from "react-icons/fa";
import { useState } from "react";

interface QuantityShopCartProps {
  quantity: number;
}

export default function QuantityShopCart({ quantity }: QuantityShopCartProps) {
  const [newQuantity, setQuantity] = useState(quantity);
  function incrementQuantity() {
    return setQuantity(newQuantity + 1);
  }

  function decrementQuantity() {
    return setQuantity(newQuantity - 1);
  }
  return (
    <div className="flex items-center gap-8 shadow-md rounded-full w-32 px-2 ">
      <FaMinus
        size={20}
        className="bg-gray-100 rounded-full p-1 cursor-pointer"
        onClick={decrementQuantity}
      />
      {newQuantity}
      <FaPlus
        size={20}
        className="bg-gray-100 rounded-full p-1 cursor-pointer"
        onClick={incrementQuantity}
      />
    </div>
  );
}
