import { useParams, Link } from "react-router-dom";
import Rating from "../components/Rating";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProductItem } from "../utils/productType";

const Product = () => {
  const [product, setProduct] = useState<ProductItem>();
  const { id: productId } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(`/api/products/${productId}`);
      setProduct(data);
    };
    fetchProducts();
  }, [productId]);

  return (
    <>
      <div className="mx-2 md:mx-0">
        <Link to="/">
          <button className="btn w-24 mt-12 mb-6">Go back</button>
        </Link>
      </div>
      <div className="md:flex gap-6 justify-between mb-4">
        <div className=" mx-3 md:mx-0">
          <img src={product?.image} alt="" />
        </div>
        <div className="flex flex-col basis-1/4">
          <div
            className="grid ml-6 prose mt-6 md:mt-0
          "
          >
            <h2 className="text-left">{product?.name}</h2>
          </div>
          <div className="divider"></div>
          <div className="grid h-4  rounded-box place-items-left ml-6 ">
            <Rating
              value={product?.rating ?? 5}
              text={`${product?.numReviews} reviews`}
            />
          </div>
          <div className="divider"></div>
          <p className="ml-6">{`Price: $${product?.price}`}</p>
          <div className="divider"></div>
          <p className="ml-6">{product?.description}</p>
        </div>
        <div className="card bg-base-100 shadow-xl h-min lg:basis-1/5  xl:basis-1/6">
          <div className="card-body">
            <div>
              <p>Price:</p>
              <p className="card-title">{`$${product?.price}`}</p>
            </div>
            <div className="divider my-0"></div>
            <p>Status:</p>
            <h2 className="card-title">
              {product?.countInStock ? "In Stock" : "Out Of Stock"}
            </h2>

            <div className="divider my-0"></div>
            <div className="card-actions justify-start">
              <button
                disabled={product?.countInStock ? false : true}
                className="btn btn-primary  md:btn-md  md:w-32"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
