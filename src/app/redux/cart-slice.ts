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

// POST
export const addToCartAsync = createAsyncThunk(
  "cart/addToCartAsync",
  async ({ productId, quantity }: { productId: string; quantity: number }) => {
    const response = await axios.post("/api/cart", {
      productId,
      quantity,
    });

    if (!response.data || response.data.error) {
      throw new Error(response.data?.error || "Failed to add to cart");
    }

    return response.data.cart;
  }
);

// Get
export const fetchCartAsync = createAsyncThunk(
  "cart/fetchCartAsync",
  async () => {
    const response = await axios.get(`/api/cart`);

    if (!response.data || response.data.error) {
      throw new Error(response.data?.error || "Failed to fetch cart");
    }

    return response.data.cart;
  }
);

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async ({ id, quantity }: { id: string; quantity: number }) => {
    const response = await axios.patch(`/api/cart`, {
      id,
      quantity
    });

    return response.data;
  }
);

export const deleteCartAsync = createAsyncThunk(
  "cart/deleteCart",
  async ({itemid}: {itemid: string}) => {
     await axios.delete(`/api/cart/${itemid}`) 
  }
)

export const deleteAllCartAsync = createAsyncThunk(
  "cart/deleteAllCart",
  async () => {
     await axios.delete(`/api/cart`)
  }
)

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
    // when post data
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

      // when get data
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
