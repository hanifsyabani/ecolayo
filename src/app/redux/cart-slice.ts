import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, Images, Tag, Category } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library"; // Import Decimal untuk konversi

// Perbaikan: Samakan tipe dengan yang digunakan di tampilan
interface CartItem extends Omit<Product, "price"> {
  price: number; // Konversi Decimal ke number
  images: Images[];
  tag: Tag[];
  category: Category;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
