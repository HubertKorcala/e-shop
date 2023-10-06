import { RxCross2 } from "react-icons/rx";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/Message/ErrorMessage";
import { useGetAllOrdersQuery } from "../../slices/ordersApiSlice";
import { OrderType } from "../../types/orderType";
import { MdDone } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetAllOrdersQuery();

  const navigate = useNavigate();

  const detailsHandler = (id: string) => {
    navigate(`/order/${id}`);
  };
  return (
    <div className="">
      <div className="prose my-4">
        <h1>My Orders</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <Loader />}
            {error && (
              <>
                <ErrorMessage message={String(error)} />
              </>
            )}
            {!isLoading &&
              orders.map((order: OrderType, index: number) => (
                <tr className="hover" key={index}>
                  <th>{index + 1}</th>
                  <td>{String(order._id)}</td>
                  <td>{order.user.name}</td>
                  <td>{String(order.createdAt).substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      String(order.paidAt).substring(0, 10)
                    ) : (
                      <RxCross2 />
                    )}
                  </td>
                  <td>{order.isDelivered ? <MdDone /> : <RxCross2 />}</td>
                  <td>
                    <button
                      onClick={() => detailsHandler(order._id)}
                      className="btn btn-xs"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
