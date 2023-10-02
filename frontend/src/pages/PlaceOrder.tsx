import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { CartItem } from "../utils/cartType";
import { useEffect } from "react";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import ErrorMessage from "../components/Message/ErrorMessage";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { clearCartItems } from "../slices/cartSlice";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispanch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (Object.values(cart.shippingAddress).includes("")) {
      navigate("/shipping");
    } else if (cart.paymentMethod === "" || !cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.cartItems
          .reduce((a, item) => a + item.price * item.qty, 0)
          .toFixed(2),
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispanch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      console.log(error.data.message);
      toast.error(error.data.message);
    }
  };

  return (
    <>
      <FormContainer>
        <CheckoutSteps order />
      </FormContainer>
      <div className="flex justify-around flex-wrap">
        <div className="prose w-full mb-6 ">
          <h2 className="text-3xl mb-3 mt-8">Shipping</h2>
          <div className="flex">
            <h2 className="m-0 text-lg mr-1">Address:</h2>
            <p className=" text-md font-medium ">
              {Object.values(cart.shippingAddress).join(", ")}
            </p>
          </div>
          <div className="divider my-0"></div>
          <h2 className="text-3xl mb-3 mt-4">Payment Method</h2>

          <div className="flex">
            <h2 className="m-0 text-lg mr-1">Method:</h2>
            <p className=" text-md font-medium ">{cart.paymentMethod}</p>
          </div>
          <div className="divider my-0"></div>
          <h2 className="text-3xl mb-8 mt-4">Order Items</h2>
          <div className="">
            {cart.cartItems.map((item: CartItem) => (
              <div key={item._id}>
                <div className="flex prose justify-between">
                  <img
                    src={item.image}
                    alt={`${item.name} img`}
                    className="w-14 h-11 rounded-md m-0"
                  />
                  <h4 className=" my-0">
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </h4>
                  <p className="m-0">{`${item.qty}x $${item.price} = $${(
                    item.qty * item.price
                  ).toFixed(2)}`}</p>
                </div>
                {cart.cartItems.length === 1 ||
                cart.cartItems[cart.cartItems.length - 1]._id === item._id ? (
                  <></>
                ) : (
                  <div className="divider my-2 "></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl h-min prose w-96 mb-6">
          <div className="card-body">
            <h1 className="m-0 mb-4">Order Summary</h1>
            <div className="divider my-0"></div>
            <div className="flex">
              <h3 className="m-0">Items:</h3>
              <p className="card-title justify-end m-0">
                $
                {cart.cartItems
                  .reduce((a, item) => a + item.price * item.qty, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="divider my-0"></div>
            <div className="flex">
              <h3 className="m-0">Shipping:</h3>
              <p className="card-title justify-end m-0">
                ${cart.shippingPrice}
              </p>
            </div>
            <div className="divider my-0"></div>
            <div className="flex">
              <h3 className="m-0">Tax:</h3>
              <p className="card-title justify-end m-0">${cart.taxPrice}</p>
            </div>
            <div className="divider my-0"></div>
            <div className="flex">
              <h3 className="m-0">Total:</h3>
              <p className="card-title justify-end m-0">${cart.totalPrice}</p>
            </div>
            <div className="divider my-0"></div>
            {error && (
              <>
                <ErrorMessage>{String(error)}</ErrorMessage>
                <div className="divider my-0"></div>
              </>
            )}
            <div className="card-actions justify-start">
              <button
                className="btn btn-primary  md:btn-md  md:w-32"
                onClick={placeOrderHandler}
              >
                Place Order
              </button>
              {isLoading && <Loader />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
