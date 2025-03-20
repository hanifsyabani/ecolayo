"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import { removeFromCart, clearCart } from "@/app/redux/cart-slice";
import { Trash2 } from "lucide-react";

export default function Cart() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div className="fixed bottom-0 right-0 bg-white shadow-lg p-4 w-80 border">
      <h2 className="text-lg font-bold mb-2">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <ul className="space-y-2">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between items-center">
              <p>{item.name} (x{item.quantity})</p>
              <button onClick={() => dispatch(removeFromCart(item.id))}>
                <Trash2 size={18} className="text-red-500 hover:text-red-700" />
              </button>
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <button
          onClick={() => dispatch(clearCart())}
          className="mt-3 w-full bg-red-500 text-white py-1 rounded"
        >
          Clear Cart
        </button>
      )}
    </div>
  );
}
