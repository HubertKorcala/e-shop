import { Link, useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice";
import ErrorMessage from "../components/Message/ErrorMessage";
import Loader from "../components/Loader";
import { OrderType } from "../types/orderType";
import SuccessMessage from "../components/Message/successMessage";

const Order = () => {
  const { id: orderId } = useParams();

  const { data, refetch, isLoading, error } = useGetOrderDetailsQuery(
    String(orderId)
  );

  const order: OrderType = data;

  return isLoading ? (
    <Loader />
  ) : error ? (
    <ErrorMessage />
  ) : (
    <div className="">
      <div className="flex w-full">
        <div className=" mx-auto prose">
          <h1 className="whitespace-nowrap my-11">{`Order ${orderId}`}</h1>
        </div>
      </div>
      <div className="flex justify-around flex-wrap">
        <div className="prose w-full mb-6 ">
          <h2 className="text-3xl mb-3 mt-8">Shipping</h2>
          <div className="flex">
            <h2 className="m-0 text-lg mr-1">Name:</h2>
            <p className=" text-md font-medium mb-3">{order.user.name}</p>
          </div>
          <div className="flex">
            <h2 className="m-0 text-lg mr-1">Email:</h2>
            <p className=" text-md font-medium mb-3">{order.user.email}</p>
          </div>
          <div className="flex">
            <h2 className="m-0 text-lg mr-1">Address:</h2>
            <p className=" text-md font-medium mb-3">
              {Object.values(order.shippingAddress).join(", ")}
            </p>
          </div>
          {order.isDelivered ? (
            <SuccessMessage message={`Delivered on ${order.deliveredAt}`} />
          ) : (
            <ErrorMessage message="Not Delivered" />
          )}
          <div className="divider mb-0"></div>
          <h2 className="text-3xl mb-3 mt-4">Payment Method</h2>

          <div className="flex">
            <h2 className="m-0 text-lg mr-1">Method:</h2>
            <p className=" text-md font-medium mb-3">{order.paymentMethod}</p>
          </div>
          {order.isDelivered ? (
            <SuccessMessage message={`Paid at ${order.paidAt}`} />
          ) : (
            <ErrorMessage message="Not Paid" />
          )}
          <div className="divider mb-0"></div>
          <h2 className="text-3xl mb-8 mt-4">Order Items</h2>
          <div className="">
            {order.orderItems.map((item) => (
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
                    Number(item.qty) * item.price
                  ).toFixed(2)}`}</p>
                </div>
                {order.orderItems.length === 1 ||
                order.orderItems[order.orderItems.length - 1]._id ===
                  item._id ? (
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
            <h1 className="m-0 mb-4 text-3xl mx-auto">Order Summary</h1>
            <div className="divider my-0"></div>
            <div className="flex">
              <h3 className="m-0">Items:</h3>
              <p className="card-title justify-end m-0">
                $
                {order.orderItems
                  .reduce((a, item) => a + item.price * Number(item.qty), 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="divider my-0"></div>
            <div className="flex">
              <h3 className="m-0">Shipping:</h3>
              <p className="card-title justify-end m-0">
                ${order.shippingPrice}
              </p>
            </div>
            <div className="divider my-0"></div>
            <div className="flex">
              <h3 className="m-0">Tax:</h3>
              <p className="card-title justify-end m-0">${order.taxPrice}</p>
            </div>
            <div className="divider my-0"></div>
            <div className="flex">
              <h3 className="m-0">Total:</h3>
              <p className="card-title justify-end m-0">${order.totalPrice}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
