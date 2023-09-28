import { BiLogIn } from "react-icons/bi";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdPayment } from "react-icons/md";
import { GiFinishLine } from "react-icons/gi";
import { Link } from "react-router-dom";

// type Steps = {
//   step1?: object;
//   step2?: object;
//   step3?: object;
//   step4?: object;
// };
enum Steps {
  "signIn",
  "shipping",
  "payment",
  "order",
}

type Props = {
  step: string;
};

const CheckoutSteps: React.FC<{ step: Props }> = (props) => {
  return (
    <ul className="steps">
      <li className="step step-primary ">
        <Link className="flex items-center" to={`/login`}>
          <BiLogIn />
          <p className="m-0 ml-1">Sign In</p>
        </Link>
      </li>
      <li className="step step-primary">
        <Link className="flex items-center ml-4" to={`/shipping`}>
          <LiaShippingFastSolid />
          <p className="m-0 ml-1">Shipping</p>
        </Link>
      </li>
      <li className="step">
        <Link className="flex items-center ml-1" to={`/payment`}>
          <MdPayment />
          <p className="m-0 ml-1">Payment</p>
        </Link>
      </li>
      <li className="step">
        <Link className="flex items-center ml-1" to={`/placeorder`}>
          <GiFinishLine />
          <p className="m-0 ml-1">Place Order</p>
        </Link>
      </li>
    </ul>
  );
};

export default CheckoutSteps;
