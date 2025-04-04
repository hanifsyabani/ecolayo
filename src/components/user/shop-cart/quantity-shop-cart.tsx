"use client";

import { FaMinus, FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";

interface QuantityShopCartProps {
  quantity: number;
  productId: string;
  onQuantityChange: (productId: string, quantity: number) => void;
}

export default function QuantityShopCart({ 
  quantity, 
  productId, 
  onQuantityChange 
}: QuantityShopCartProps) {
  const [newQuantity, setQuantity] = useState(quantity);
  
  // When the parent's quantity changes, update the local state
  useEffect(() => {
    setQuantity(quantity);
  }, [quantity]);

  // When local quantity changes, notify parent component
  useEffect(() => {
    if (newQuantity !== quantity) {
      onQuantityChange(productId, newQuantity);
    }
  }, [newQuantity, quantity, productId, onQuantityChange]);

  function incrementQuantity() {
    setQuantity(prev => Math.min(prev + 1, 99));
  }

  function decrementQuantity() {
    setQuantity(prev => Math.max(prev - 1, 1)); 
  }
  
  return (
    <div className="flex items-center gap-8 shadow-md rounded-full w-32 px-2">
      <FaMinus
        size={20}
        className={`${newQuantity > 1 ? 'bg-gray-100' : 'bg-gray-200'} rounded-full p-1 cursor-pointer`}
        onClick={decrementQuantity}
      />
      <span>{newQuantity}</span>
      <FaPlus
        size={20}
        className="bg-gray-100 rounded-full p-1 cursor-pointer"
        onClick={incrementQuantity}
      />
    </div>
  );
}