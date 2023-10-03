import { shippingAddressType } from "./cartType";

export type OrderType = {
  isDelivered: boolean;
  isPaid: boolean;
  itemsPrice: number;
  orderItems: {
    image: string;
    name: string;
    price: number;
    product: string;
    qty: string;
    _id: string;
  }[];
  paymentMethod: string;
  shippingAddress: shippingAddressType;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  deliveredAt: Date;
  paidAt: Date;
  paymentResult: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  user: {
    email: string;
    name: string;
  };
  _id: string;
  __v: number;
};
