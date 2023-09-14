import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(String(localStorage.getItem("cart"))) // czy moge uzyc tu String???
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {},
});

export default cartSlice.reducer;
