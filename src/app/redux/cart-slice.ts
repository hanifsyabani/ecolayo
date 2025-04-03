import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Product, Images, Tag, Category } from "@prisma/client";

// Define types
interface CartItem {
  id: string;
  quantity: number;
  productId: string;
  cartId: string;
  product: Omit<Product, "price"> & {
    price: number;
    images: Images[];
    tag: Tag[];
    category: Category;
  };
}

interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
}

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

// Async thunk to add product to cart
export const addToCartAsync = createAsyncThunk(
  "cart/addToCartAsync",
  async ({
    userId,
    productId,
    quantity,
  }: {
    userId: string;
    productId: string;
    quantity: number;
  }) => {
    const response = await axios.post("/api/cart", {
      userId,
      productId,
      quantity,
    });
    
    if (!response.data || response.data.error) {
      throw new Error(response.data?.error || "Failed to add to cart");
    }
    
    return response.data.cart;
  }
);

// Async thunk to fetch cart
export const fetchCartAsync = createAsyncThunk(
  "cart/fetchCartAsync",
  async (userId: string) => {
    const response = await axios.get(`/api/cart?userId=${userId}`);
    
    if (!response.data || response.data.error) {
      throw new Error(response.data?.error || "Failed to fetch cart");
    }
    
    return response.data.cart;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add to cart cases
      .addCase(addToCartAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add to cart";
      })
      
      // Fetch cart cases
      .addCase(fetchCartAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cart";
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;

// Selector to get cart items count
export const selectCartItemsCount = (state: { cart: CartState }) => 
  state.cart.cart?.items.reduce((total, item) => total + item.quantity, 0) || 0;

// Selector to get cart total
export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.cart?.items.reduce(
    (total, item) => total + item.product.price * item.quantity, 
    0
  ) || 0;