import { useState } from "react";
import FormContainer from "../components/FormContainer";
import Input, { InputProps } from "../components/Input";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { saveShippingAddress } from "../slices/cartSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Shipping = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const shippingAddress = cart.shippingAddress;

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formHandler = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  const inputData: InputProps[] = [
    {
      label: "Address",
      type: "address",
      id: "address",
      value: address,
      placeHolder: "Enter address",
      onChange: (e) => setAddress(e.target.value),
    },
    {
      label: "City",
      type: "text",
      id: "city",
      value: city,
      placeHolder: "Enter city",
      onChange: (e) => setCity(e.target.value),
    },
    {
      label: "Postal Code",
      type: "text",
      id: "postalCode",
      value: postalCode,
      placeHolder: "Enter postal code",
      onChange: (e) => setPostalCode(e.target.value),
    },
    {
      label: "Country",
      type: "text",
      id: "country",
      value: country,
      placeHolder: "Enter country",
      onChange: (e) => setCountry(e.target.value),
    },
  ];
  return (
    <FormContainer>
      <form>
        <h1 className="mt-6">Shipping</h1>
        {inputData.map((data) => (
          <Input data={data} key={data.id} />
        ))}
        <button
          type="submit"
          onClick={formHandler}
          className=" btn btn-primary mt-1"
        >
          Continue
        </button>
      </form>
    </FormContainer>
  );
};

export default Shipping;
