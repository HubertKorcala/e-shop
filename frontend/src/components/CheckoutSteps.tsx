import { BiLogIn } from "react-icons/bi";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdPayment } from "react-icons/md";
import { GiFinishLine } from "react-icons/gi";
import { Link } from "react-router-dom";

type Props = {
  login?: boolean;
  shipping?: boolean;
  payment?: boolean;
  order?: boolean;
};

const CheckoutSteps = ({ login, shipping, payment, order }: Props) => {
  shipping === true
    ? (login = true)
    : payment === true
    ? (shipping = true) && (login = true)
    : order === true
    ? (payment = true) && (shipping = true) && (login = true)
    : (login = true);

  return (
    <ul className="steps">
      <li className="step step-primary">
        {login ? (
          <Link className="flex items-center no-underline" to={`/login`}>
            <BiLogIn />
            <p className="m-0 ml-1">Sign In</p>
          </Link>
        ) : (
          <div className="flex items-center no-underline select-none">
            <BiLogIn color="gray" />
            <p className="m-0 ml-1 text-gray-400">Sign In</p>
          </div>
        )}
      </li>
      <li className={shipping ? `step step-primary` : `step`}>
        {shipping ? (
          <Link
            className="flex items-center no-underline ml-4"
            to={`/shipping`}
          >
            <LiaShippingFastSolid />
            <p className="m-0 ml-1">Shipping</p>
          </Link>
        ) : (
          <div className="flex items-center no-underline select-none">
            <LiaShippingFastSolid />
            <p className="m-0 ml-1 text-gray-400">Shipping</p>
          </div>
        )}
      </li>
      <li className={payment ? `step step-primary` : `step`}>
        {payment ? (
          <Link className="flex items-center no-underline ml-1" to={`/payment`}>
            <MdPayment />
            <p className="m-0 ml-1">Payment</p>
          </Link>
        ) : (
          <div className="flex items-center no-underline select-none">
            <MdPayment />
            <p className="m-0 ml-1 text-gray-400">Payment</p>
          </div>
        )}
      </li>
      <li className={order ? `step step-primary` : `step`}>
        {order ? (
          <Link
            className="flex items-center no-underline ml-1"
            to={`/placeorder`}
          >
            <GiFinishLine />
            <p className="m-0 ml-1">Place Order</p>
          </Link>
        ) : (
          <div className="flex items-center no-underline select-none">
            <GiFinishLine />
            <p className="m-0 ml-1 text-gray-400">Place Order</p>
          </div>
        )}
      </li>
    </ul>
  );
};

export default CheckoutSteps;
