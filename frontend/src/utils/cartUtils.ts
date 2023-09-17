import { WritableDraft } from "immer/dist/internal.js";
import { CartItem, CartType } from "./cartType";

export const addDecimals = (num: number) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state: WritableDraft<CartType>) => {
  //Calculate items price
  state.itemPrice = addDecimals(
    state.cartItems.reduce(
      (acc: number, item: CartItem) => acc + item.price * item.qty,
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

  return state;
};
