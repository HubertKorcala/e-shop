import { ProductItem } from "../utils/productType";

const Product = (props: { product: ProductItem }) => {
  return (
    <div className="card card-compact w-80 bg-base-100 shadow-xl justify-self-center">
      <figure>
        <img src={props.product.image} alt="" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{props.product.name}</h2>
        <p>${props.product.price}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
