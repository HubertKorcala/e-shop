import { useParams, Link, useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import { useGetProductByIdQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import ErrorMessage from "../components/Message/ErrorMessage";
import { useState } from "react";
import { ProductItem } from "../utils/productType";
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";

const Product = () => {
  const { id: productId } = useParams();
  const id = String(productId);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const { data: product, isLoading, error } = useGetProductByIdQuery(id);

  const productItem: ProductItem = product;

  const addToCartHandler = () => {
    dispatch(addToCart({ ...productItem, qty }));
    navigate("/cart");
  };

  if (error) {
    if ("status" in error) {
      const errMsg =
        "error" in error ? error.error : JSON.stringify(error.data);

      return (
        <div>
          <ErrorMessage>{errMsg}</ErrorMessage>
        </div>
      );
    } else {
      return <ErrorMessage>{error.message}</ErrorMessage>;
    }
  }

  return (
    <>
      <div className="mx-2 md:mx-0">
        <Link to="/">
          <button className="btn w-24 mt-12 mb-6">Go back</button>
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <div className="md:flex gap-6 justify-between mb-4">
            <div className=" mx-3 md:mx-0">
              <img src={productItem?.image} alt="" />
            </div>
            <div className="flex flex-col basis-1/4">
              <div
                className="grid ml-6 prose mt-6 md:mt-0
          "
              >
                <h2 className="text-left">{productItem?.name}</h2>
              </div>
              <div className="divider"></div>
              <div className="grid h-4  rounded-box place-items-left ml-6 ">
                <Rating
                  value={productItem?.rating ?? 5}
                  text={`${productItem?.numReviews} reviews`}
                />
              </div>
              <div className="divider"></div>
              <p className="ml-6">{`Price: $${productItem?.price}`}</p>
              <div className="divider"></div>
              <p className="ml-6">{productItem?.description}</p>
            </div>
            <div className="card bg-base-100 shadow-xl h-min lg:basis-1/5  xl:basis-1/6">
              <div className="card-body">
                <div>
                  <p>Price:</p>
                  <p className="card-title">{`$${productItem?.price}`}</p>
                </div>
                <div className="divider my-0"></div>
                <p>Status:</p>
                <h2 className="card-title">
                  {productItem?.countInStock ? "In Stock" : "Out Of Stock"}
                </h2>

                {productItem.countInStock > 0 && (
                  <>
                    <div className="divider my-0"></div>
                    <p>Quantity:</p>
                    <select
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      className="select select-bordered w-1/2 max-w-xs"
                    >
                      {[...Array(productItem.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </>
                )}

                <div className="divider my-0"></div>
                <div className="card-actions justify-start">
                  <button
                    disabled={productItem?.countInStock ? false : true}
                    className="btn btn-primary  md:btn-md  md:w-32"
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Product;
