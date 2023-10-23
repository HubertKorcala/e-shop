import { ProductItem } from "../types/productType";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = (props: { product: ProductItem }) => {
  return (
    <div className="card card-compact w-80 bg-base-100 shadow-xl justify-self-center">
      <figure>
        <Link to={`/product/${props.product._id}`}>
          <img src={props.product.image} alt="" />
        </Link>
      </figure>
      <div className="card-body">
        <Link to={`/product/${props.product._id}`}>
          <h2 className="card-title">{props.product.name}</h2>
        </Link>
        <p>${props.product.price}</p>
        <Rating
          value={props.product.rating}
          text={`${props.product.numReviews} reviews`}
        />
        <div className="card-actions justify-end">
          <Link to={`/product/${props.product._id}`}>
            <button className="btn btn-primary">Buy Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
