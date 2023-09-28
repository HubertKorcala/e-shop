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

export type shippingAddressType = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

export type CartType = {
  cartItems: CartItem[];
  shippingAddress: shippingAddressType;
  paymentMethod: string;

  itemPrice: string;
  shippingPrice: string;
  taxPrice: string;
  totalPrice: string;
};
