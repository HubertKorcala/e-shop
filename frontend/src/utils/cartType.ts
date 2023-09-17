export type CartItem = {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  reviews: string[];
  createdAt: Date;
  updatedAt: Date;
  qty: number;
};

export type CartType = {
  cartItems: CartItem[];
  itemPrice: string;
  shippingPrice: string;
  taxPrice: string;
  totalPrice: string;
};
