import { ProductItem } from "./productType";

export type CartType = {
  cartItems: ProductItem[];
  itemPrice: string;
  shippingPrice: string;
  taxPrice: string;
  totalPrice: string;
};
