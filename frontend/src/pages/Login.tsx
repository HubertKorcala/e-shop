import { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInHandler = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`${email} ${password}`);
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
        <div>
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
        >
          Sing in
        </button>
      </form>
      <p>
        New Customer? <Link to={"/register"}>Register</Link>
      </p>
    </FormContainer>
  );
};

export default Login;
