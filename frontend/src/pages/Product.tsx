import { useParams, Link, useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import {
  useAddReviewMutation,
  useGetProductByIdQuery,
} from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import ErrorMessage from "../components/Message/ErrorMessage";
import { useState } from "react";
import { ProductItem } from "../types/productType";
import { addToCart } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../store";

const Product = () => {
  const { id: productId } = useParams();
  const id = String(productId);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [qty, setQty] = useState(1);

  const {
    data: product,
    refetch,
    isLoading,
    error,
  } = useGetProductByIdQuery(id);

  const [addReview, { isLoading: loadingReview }] = useAddReviewMutation();

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
          <ErrorMessage message={errMsg} />
        </div>
      );
    } else {
      return <ErrorMessage message={error.message} />;
    }
  }

  const reviewSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success("Review submitted successfully");
      setRating(5);
      setComment("");
    } catch (err) {
      toast.error("Review submission failed");
    }
  };

  return (
    <>
      <div className="mx-2 md:mx-0">
        <Link className="mx-2 md:mx-0" to="/">
          <button className="btn w-24 mt-12 mb-6">Go back</button>
        </Link>
      </div>

      {loadingReview && <Loader />}

      {isLoading ? (
        <Loader />
      ) : (
        <>
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
          <div className="mt-2 max-w-2xl">
            <div className="alert mb-4">
              <div className="prose">
                <h2>Reviews</h2>
              </div>
            </div>
            {productItem?.reviews.length > 0 ? (
              productItem?.reviews.map((review) => (
                <div key={review._id} className="chat chat-start">
                  <div className="chat-header flex">
                    {review.name}
                    <div className="ml-2 ">
                      <Rating style="text-xs" value={review.rating} />
                    </div>
                  </div>
                  <div className="chat-bubble">{review.comment}</div>
                  <div className="chat-footer opacity-50">
                    {String(review.createdAt).substring(0, 10)}
                  </div>
                </div>
              ))
            ) : (
              <div className="alert alert-info mb-6">
                <span>No Reviews.</span>
              </div>
            )}
            <div className="w-11/12 mx-auto">
              <div className="alert my-4">
                <div className="prose">
                  <h2>Write a Customer Review</h2>
                </div>
              </div>
              {userInfo ? (
                <form>
                  <div className="flex mb-4">
                    <p>Rating</p>
                    <div className="rating rating-half">
                      <input
                        type="radio"
                        onChange={() => setRating(0)}
                        name="rating-10"
                        className="rating-hidden"
                        checked={rating === 0}
                      />
                      <input
                        type="radio"
                        onChange={() => setRating(0.5)}
                        name="rating-10"
                        className="mask mask-star-2 mask-half-1"
                        checked={rating === 0.5}
                      />
                      <input
                        type="radio"
                        onChange={() => setRating(1)}
                        name="rating-10"
                        className="mask mask-star-2 mask-half-2"
                        checked={rating === 1}
                      />
                      <input
                        type="radio"
                        onChange={() => setRating(1.5)}
                        name="rating-10"
                        className="mask mask-star-2 mask-half-1"
                        checked={rating === 1.5}
                      />
                      <input
                        type="radio"
                        onChange={() => setRating(2)}
                        name="rating-10"
                        className="mask mask-star-2 mask-half-2"
                        checked={rating === 2}
                      />
                      <input
                        type="radio"
                        onChange={() => setRating(2.5)}
                        name="rating-10"
                        className="mask mask-star-2 mask-half-1"
                        checked={rating === 2.5}
                      />
                      <input
                        type="radio"
                        onChange={() => setRating(3)}
                        name="rating-10"
                        className="mask mask-star-2 mask-half-2"
                        checked={rating === 3}
                      />
                      <input
                        type="radio"
                        onChange={() => setRating(3.5)}
                        name="rating-10"
                        className="mask mask-star-2 mask-half-1"
                        checked={rating === 3.5}
                      />
                      <input
                        type="radio"
                        onChange={() => setRating(4)}
                        name="rating-10"
                        className="mask mask-star-2 mask-half-2"
                        checked={rating === 4}
                      />
                      <input
                        type="radio"
                        onChange={() => setRating(4.5)}
                        name="rating-10"
                        className="mask mask-star-2 mask-half-1"
                        checked={rating === 4.5}
                      />
                      <input
                        type="radio"
                        onChange={() => setRating(5)}
                        name="rating-10"
                        className="mask mask-star-2 mask-half-2"
                        checked={rating === 5}
                      />
                    </div>
                  </div>
                  <div className="form-control">
                    <label htmlFor="comment" className="mb-2">
                      Comment
                    </label>
                    <textarea
                      className="textarea textarea-bordered h-24"
                      placeholder="Enter comment"
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    onClick={reviewSubmitHandler}
                    className="btn btn-primary my-4"
                  >
                    Submit
                  </button>
                </form>
              ) : (
                <div className="alert alert-info mb-6">
                  <span>
                    Please{" "}
                    <Link className="link" to="/login">
                      sign in
                    </Link>{" "}
                    to write a review
                  </span>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Product;
