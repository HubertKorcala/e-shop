import { createSlice } from "@reduxjs/toolkit";
import { ProductItem } from "../utils/productType";
import { CartType } from "../utils/cartType";
import { updateCart } from "../utils/cartUtils";

const initialState: CartType = localStorage.getItem("cart")
  ? JSON.parse(String(localStorage.getItem("cart"))) // czy moge uzyc tu String???
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const item: ProductItem = action.payload;

      const existItem: ProductItem | undefined = state.cartItems.find(
        //dobrze tu typuje?
        (x: ProductItem) => x._id === item._id
      );

      if (existItem) {
        state.cartItems = state.cartItems.map((x: ProductItem) =>
          x._id === item._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      updateCart(state);
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
