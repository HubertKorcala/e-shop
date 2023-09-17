import { createSlice } from "@reduxjs/toolkit";
import { ProductItem } from "../utils/productType";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(String(localStorage.getItem("cart"))) // czy moge uzyc tu String???
  : { cartItems: [] };

const addDecimals = (num: number) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

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

      //Calculate items price
      state.itemPrice = addDecimals(
        state.cartItems.reduce(
          (acc: number, item: any) => acc + item.price * item.qty, //fix typing later!!!
          0
        )
      );

      // Calculate shipping price (If order is over $100 then free, else $10 shipping)
      state.shippingPrice = addDecimals(Number(state.itemPrice) > 100 ? 0 : 10);

      // Calculate tax price (15% tax)
      state.taxPrice = addDecimals(
        Number((0.15 * Number(state.itemPrice)).toFixed(2))
      );

      // Calculate total price
      state.totalPrice = (
        Number(state.itemPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
