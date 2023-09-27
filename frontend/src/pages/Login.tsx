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
  return (
    <FormContainer>
      <form>
        <h1 className="mt-6">Sign in</h1>
        <div>
          <label htmlFor="email" className="mb-2">
            Email Adress
          </label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Enter email"
            className="input input-bordered w-full max-w-md"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <label htmlFor="password" className="mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            placeholder="Enter password"
            className="input input-bordered w-full max-w-md"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          onClick={signInHandler}
          className="btn btn-primary mt-4"
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
