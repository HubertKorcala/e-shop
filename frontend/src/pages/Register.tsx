import { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Input, { InputProps } from "../components/Input";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const registerHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmedPassword) {
      toast.error("Passwords do not match");
      return;
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const inputData: InputProps[] = [
    {
      label: "Name",
      type: "string",
      id: "name",
      value: name,
      placeHolder: "Enter name",
      onChange: (e) => setName(e.target.value),
    },
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
    {
      label: "Confirm Password",
      type: "password",
      id: "confirmPassword",
      value: confirmedPassword,
      placeHolder: "Confirm password",
      onChange: (e) => setConfirmedPassword(e.target.value),
    },
  ];

  return (
    <FormContainer>
      <form>
        <h1 className="mt-6">Sign up</h1>
        {inputData.map((data) => (
          <Input key={data.label} data={data} />
        ))}
        <button
          type="submit"
          onClick={registerHandler}
          className="btn btn-primary mt-1"
          disabled={isLoading}
        >
          Register
        </button>
        {isLoading && <Loader />}
      </form>
      <p>
        Already have an account?{" "}
        <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>
          Login
        </Link>
      </p>
    </FormContainer>
  );
};

export default Register;
