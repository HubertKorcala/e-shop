import { Link, useNavigate } from "react-router-dom";
import profilePicture from "../assets/images/profile-avatar.png";
import ThemeToggle from "./ThemeToggle";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";

const HeaderNavBar = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall("").unwrap();
      dispatch(logout());
      navigate(`/login`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="navbar bg-base-100 drop-shadow-lg rounded-box z-10">
      <div className="flex-1">
        <Link to={`/`} className="btn btn-ghost normal-case text-xl">
          E-shop
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">
                {cart.cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            </div>
          </label>
          <div
            tabIndex={0}
            className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">
                {cart.cartItems.reduce((a, c) => a + c.qty, 0)}{" "}
                {cart.cartItems.reduce((a, c) => a + c.qty, 0) === 1
                  ? "Item"
                  : "Items"}
              </span>
              <span className="text-info">
                Subtotal: $
                {cart.cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </span>
              <div className="card-actions">
                <Link to={`/cart`}>
                  <button className="btn btn-primary btn-block">
                    View cart
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full scale-125 fill-white">
              <img src={profilePicture} />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {userInfo ? (
              <>
                <li>
                  <Link className="justify-between" to={`/profile`}>
                    Profile <span className="badge">{userInfo.name}</span>
                  </Link>
                </li>
                <li>
                  <Link to={`settings`}>Settings</Link>
                </li>
                <li>
                  <a className=" cursor-pointer" onClick={logoutHandler}>
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={`/login`}>Log In</Link>
                </li>
                <li>
                  <Link to={`/register`}>Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default HeaderNavBar;
