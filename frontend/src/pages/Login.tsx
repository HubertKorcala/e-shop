import { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Input, { InputProps } from "../components/Input";
import CheckoutSteps from "../components/CheckoutSteps";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const signInHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const inputData: InputProps[] = [
    {
      label: "Email Address",
      type: "email",
      id: "email",
      value: email,
      placeHolder: "Enter email",
      onChange: (e) => setEmail(e.target.value),
    },
    {
      label: "Password",
      type: "password",
      id: "password",
      value: password,
      placeHolder: "Enter password",
      onChange: (e) => setPassword(e.target.value),
    },
  ];
  //"mt-6"
  return (
    <FormContainer>
      {redirect === "/shipping" && <CheckoutSteps login />}
      <h1 className={redirect === `/shipping` ? `-mt-6` : `mt-6`}>Sign in</h1>
      <form>
        {inputData.map((data) => (
          <Input key={data.id} data={data} />
        ))}
        <button
          type="submit"
          onClick={signInHandler}
          className="btn btn-primary mt-1"
          disabled={isLoading}
        >
          Sing in
        </button>
        {isLoading && <Loader />}
      </form>
      <p>
        New Customer?{" "}
        <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>
          Register
        </Link>
      </p>
    </FormContainer>
  );
};

export default Login;
