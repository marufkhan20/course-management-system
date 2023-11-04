import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthBanner from "../components/AuthBanner";
import Button from "../components/ui/Button";
import { useRegisterMutation } from "../features/auth/authApi";

const Register = () => {
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referralId, setReferralId] = useState();
  const [error, setError] = useState({});

  // check referral
  const location = useLocation();
  useEffect(() => {
    if (location?.state?.userId) {
      setReferralId(location?.state?.userId);
    }
  }, [location]);

  console.log("referralId", referralId);

  const navigate = useNavigate();

  const [register, { data: user, isLoading, isError, error: responseError }] =
    useRegisterMutation();

  useEffect(() => {
    if (!isLoading && isError) {
      const { data } = responseError || {};
      setError(data.error);
    }

    if (!isLoading && !isError && user?._id) {
      navigate("/login");
    }
  }, [user, isLoading, isError, responseError, navigate]);

  // submit hanlder
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("hello");

    if (password !== confirmPassword) {
      return setError({
        confirmPassword: "Password and Confirm Password not match!!",
      });
    }

    register({
      email,
      number,
      password,
      referralId,
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
            <h3 className="font-semibold text-2xl my-5">Sign up</h3>
            <div className="mb-4">
              <label
                className="text-content text-sm font-medium block mb-2"
                htmlFor="number"
              >
                Contact Number
              </label>
              <input
                className="block w-full border rounded-lg py-2 px-4 text-sm outline-none"
                type="number"
                required
                id="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Enter Your Contract Number"
              />
            </div>
            {error?.number && (
              <div className="mb-3 text-xs text-red-400">
                <span>{error?.number}</span>
              </div>
            )}
            <div className="mb-4">
              <label
                className="text-content text-sm font-medium block mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="block w-full border rounded-lg py-2 px-4 text-sm outline-none"
                type="email"
                required
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email Address."
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
            <div className="mb-4">
              <label
                className="text-content text-sm font-medium block mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className="block w-full border rounded-lg py-2 px-4 text-sm outline-none"
                type="password"
                required
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Enter Your Confirm Password"
              />
            </div>
            {error?.confirmPassword && (
              <div className="mb-3 text-xs text-red-400">
                <span>{error?.password}</span>
              </div>
            )}
            <div>
              <Button type="submit-hover" width="w-full">
                Create Account
              </Button>
            </div>
          </form>

          <div>
            <span className="text-xs text-content block text-center mt-10">
              Already have an account?{" "}
              <Link className="text-primary" to="/login">
                Sign in
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
