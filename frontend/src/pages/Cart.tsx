import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import { CartItem } from "../types/cartType";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product: CartItem, qty: number) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (idProduct: string) => {
    dispatch(removeFromCart(idProduct));
  };

  const checkoutHandler = () => {
    navigate(`/login?redirect=/shipping`);
  };

  return (
    <>
      <div className="prose my-7 mx-auto">
        <h1>Shoppping Cart</h1>
      </div>
      <div className=" md:gap-6 md:flex">
        <div className="w-4/6">
          {cartItems.length === 0 ? (
            <p>Shopping cart is empty</p>
          ) : (
            cartItems.map((item: CartItem) => (
              <div key={item._id}>
                <div className="flex prose justify-between">
                  <img
                    src={item.image}
                    alt={`${item.name} img`}
                    className="w-32 rounded-md m-0"
                  />
                  <h4 className=" my-0 w-32">
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </h4>
                  <p className="m-0">${item.price}</p>
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      addToCartHandler(item, Number(e.target.value))
                    }
                    className="select select-bordered w-xs"
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => removeFromCartHandler(item._id)}
                    className="btn"
                  >
                    <FaTrash />
                  </button>
                </div>
                {cartItems.length === 1 ||
                cartItems[cartItems.length - 1]._id === item._id ? (
                  <></>
                ) : (
                  <div className="divider my-2 mr-24 "></div>
                )}
              </div>
            ))
          )}
        </div>
        <div className="card bg-base-100 shadow-xl h-min mt-10 md:mt-0 md:w-80">
          <div className="card-body prose">
            <h2 className="m-0">
              Subtotal (
              {cartItems.reduce(
                (acc: number, item: CartItem) => acc + item.qty,
                0
              )}
              ) items
            </h2>
            <p className="m-0">
              $
              {cartItems
                .reduce(
                  (acc: number, item: CartItem) => acc + item.qty * item.price,
                  0
                )
                .toFixed(2)}
            </p>
            <div className="divider my-0"></div>
            <button
              onClick={checkoutHandler}
              disabled={cartItems.length === 0}
              className="btn btn-primary"
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
