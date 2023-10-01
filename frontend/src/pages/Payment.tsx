import { useEffect, useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { savePaymentMethod } from "../slices/cartSlice";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const cart = useSelector((state: RootState) => state.cart);
  const { shippingAddress } = cart;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.values(shippingAddress).includes("")) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps payment />
      <h1 className="-mt-6">Payment Method</h1>
      <h3>Select Method</h3>
      <form>
        <div className="flex items-center mb-8">
          <input
            type="radio"
            name="radio-2"
            id="paypal"
            className="radio radio-sm radio-primary"
            value={`PayPal`}
            onChange={(e) => setPaymentMethod(e.target.value)}
            checked
          />
          <label className="ml-2 font-medium" htmlFor="paypal">
            Paypal or Credit Card
          </label>
        </div>
        <button
          type="submit"
          onClick={submitHandler}
          className="btn btn-primary"
        >
          Continue
        </button>
      </form>
    </FormContainer>
  );
};

export default Payment;
