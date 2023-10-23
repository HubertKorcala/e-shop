import { useEffect, useState } from "react";
import Input, { InputProps } from "../components/Input";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useProfileMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { OrderType } from "../types/orderType";
import { RxCross2 } from "react-icons/rx";
import { MdDone } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/Message/ErrorMessage";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const {
    data: orders,
    isLoading: loadingOrders,
    error: ordersError,
  } = useGetMyOrdersQuery(userInfo?._id);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo?.email, userInfo?.name]);

  const inputData: InputProps[] = [
    {
      label: "Name",
      type: "text",
      id: "name",
      value: name,
      placeHolder: "Enter name",
      onChange: (e) => {
        setName(e.target.value);
      },
    },
    {
      label: "Email",
      type: "email",
      id: "email",
      value: email,
      placeHolder: "Enter email",
      onChange: (e) => {
        setEmail(e.target.value);
      },
    },
    {
      label: "Password",
      type: "password",
      id: "password",
      value: password,
      placeHolder: "Enter password",
      onChange: (e) => {
        setPassword(e.target.value);
      },
    },
    {
      label: "Confirm Password",
      type: "password",
      id: "confirmPassword",
      value: confirmPassword,
      placeHolder: "Confirm password",
      onChange: (e) => {
        setConfirmPassword(e.target.value);
      },
    },
  ];

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Password do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo?._id,
          name,
          email,
          password,
        }).unwrap();

        dispatch(setCredentials(res));
        setPassword("");
        setConfirmPassword("");
        toast.success("User profile updated!");
      } catch (error: any) {
        toast.error(error.data.message);
      }
    }
  };

  const detailsHandler = (id: string) => {
    navigate(`/order/${id}`);
  };

  return (
    <div className="flex justify-evenly flex-wrap gap-6">
      <div className=" w-96">
        <div className="prose my-4">
          <h1> User Profile</h1>
        </div>
        <div className="">
          {inputData.map((data) => (
            <Input data={data} key={data.id} />
          ))}
          <button
            className="btn btn-primary"
            type="submit"
            onClick={submitHandler}
          >
            Update
          </button>
          {loadingUpdateProfile && <Loader />}
        </div>
      </div>
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
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loadingOrders && <Loader />}
              {ordersError && (
                <>
                  <ErrorMessage message={String(ordersError)} />
                </>
              )}
              {orders && orders.length === 0 && <tr>No orders</tr>}
              {!loadingOrders &&
                orders.map((order: OrderType, index: number) => (
                  <tr className="hover" key={index}>
                    <th>{index + 1}</th>
                    <td>{String(order._id)}</td>
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
    </div>
  );
};

export default Profile;
