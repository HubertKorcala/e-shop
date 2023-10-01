import { createSlice } from "@reduxjs/toolkit";
import { CartItem, CartType } from "../utils/cartType";
import { updateCart } from "../utils/cartUtils";

const initialState: CartType = localStorage.getItem("cart")
  ? JSON.parse(String(localStorage.getItem("cart")))
  : { cartItems: [], shippingAddress: {}, paymentMethod: `PayPal` };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const item: CartItem = action.payload;

      const existItem: CartItem | undefined = state.cartItems.find(
        (x: CartItem) => x._id === item._id
      );

      if (existItem) {
        state.cartItems = state.cartItems.map((x: CartItem) =>
          x._id === item._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;

      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;

      return updateCart(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
} = cartSlice.actions;

export default cartSlice.reducer;
