import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthBanner from "../components/AuthBanner";
import Button from "../components/ui/Button";
import { useLoginMutation } from "../features/auth/authApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState({});

  const [login, { data, isLoading, isError, error: responseError }] =
    useLoginMutation();

  useEffect(() => {
    const { user } = data || {};
    if (!isLoading && isError) {
      const { data } = responseError || {};
      setError(data.error);
    }

    if (!isLoading && !isError && user?.userid) {
      if (user?.role === "admin" || user?.role === "student") {
        navigate("/dashboard");
      } else {
        navigate("/profile");
      }
    }
  }, [data, isLoading, isError, responseError, navigate]);

  // submit hanlder
  const submitHandler = (e) => {
    e.preventDefault();

    login({
      email,
      password,
    });
  };
  return (
    <div className="grid sm:grid-cols-2 grid-cols-1">
      <AuthBanner />
      <div>
        <div className="md:px-20 px-4 flex flex-col justify-center h-screen">
          <div className="flex items-center justify-between mb-5">
            <img className="w-12" src="/images/logo.png" alt="logo" />
            <span className="text-xs underline">
              <Link to="/">Back to Home</Link>
            </span>
          </div>
          <form onSubmit={submitHandler}>
            <h3 className="font-semibold text-2xl my-5">
              Sign into Your Account
            </h3>
            <div className="mb-4">
              <label
                className="text-content text-sm font-medium block mb-2"
                htmlFor="username"
              >
                Email
              </label>
              <input
                className="block w-full border rounded-lg py-2 px-4 text-sm outline-none"
                type="email"
                required
                id="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
              />
            </div>
            {error?.email && (
              <div className="mb-3 text-xs text-red-400">
                <span>{error?.email}</span>
              </div>
            )}
            <div className="mb-4">
              <label
                className="text-content text-sm font-medium block mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="block w-full border rounded-lg py-2 px-4 text-sm outline-none"
                type="password"
                required
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Your Password"
              />
            </div>
            {error?.password && (
              <div className="mb-3 text-xs text-red-400">
                <span>{error?.password}</span>
              </div>
            )}
            <div>
              <Link
                className="text-xs text-purple-900 font-medium mb-5 inline-block"
                to="/forgot-password"
              >
                Forgot Password?
              </Link>
            </div>
            <div>
              <Button type="submit-hover" width="w-full">
                Sign In
              </Button>
            </div>
          </form>

          <div>
            <span className="text-xs text-content block text-center mt-10">
              New User ?{" "}
              <Link className="text-primary" to="/register">
                Create an Account
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
