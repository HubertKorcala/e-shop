export type ProductItem = {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  reviews: {
    user: string;
    name: string;
    rating: number;
    comment: string;
    createdAt: Date;
  }[];
  numReviews: number;
};
