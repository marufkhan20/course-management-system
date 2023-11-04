import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthBanner from "../components/AuthBanner";
import Button from "../components/ui/Button";
import {
  useCreateNewPasswordMutation,
  useForgotPasswordMutation,
  useVerifyCodeMutation,
} from "../features/auth/authApi";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [resetInfo, setResetInfo] = useState(true);
  const [email, setEmail] = useState("");
  const [isVerify, setIsVerify] = useState(false);
  const [verifyCode, setVerifyCode] = useState();
  const [error, setError] = useState({});
  const [password, setPassword] = useState();
  const [cpassword, setCpassword] = useState();

  // forgot password function
  const [forgotPassword, { data, isLoading, isError, error: serverError }] =
    useForgotPasswordMutation();

  // verify code function
  const [verifyCodeFun, { data: verifyData, error: verifyError }] =
    useVerifyCodeMutation();

  useEffect(() => {
    if (verifyError) {
      setError(verifyError.data.error);
    }

    if (!verifyError && verifyData?.success) {
      setError({});
      setResetInfo(false);
      toast.success("Verify is successfully! Create New Password.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [verifyData, verifyError]);

  useEffect(() => {
    if (!isLoading && isError) {
      setIsVerify(false);
      setError(serverError?.data?.error);
    }

    if (!isLoading && !isError && data?.token) {
      setIsVerify(true);
      setError({});
      toast.success("Send Verify Code via email! Please check your email.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [data, isLoading, isError, serverError]);

  // submit hanlder
  const submitHandler = (e) => {
    e.preventDefault();

    if (!isVerify) {
      // check validation
      if (!email) {
        return setError({ email: "Email is Required!!" });
      }

      forgotPassword({ email });
    }

    if (isVerify) {
      if (!verifyCode) {
        return setError({ verifyCode: "Verify Code is Required!!" });
      }

      // get token from localstorage
      const token = localStorage.getItem("verifyToken");

      verifyCodeFun({ token, verifyCode });
    }
  };

  // create new password
  const [createNewPassword, { data: userWithPassword, error: userError }] =
    useCreateNewPasswordMutation();

  useEffect(() => {
    if (userError) {
      console.log(userError);
    }

    if (!userError && userWithPassword?._id) {
      navigate("/login");
    }
  }, [userWithPassword, userError, navigate]);

  // password submit handler
  const passwordSubmitHandler = (e) => {
    e.preventDefault();

    if (!password) {
      return setError({ password: "Password is Required!!" });
    }

    if (!cpassword) {
      return setError({ cpassword: "Confirm Password is Required!!" });
    }

    if (password !== cpassword) {
      return setError({
        cpassword: "Password and Confirm Password is not match!!",
      });
    }

    createNewPassword({
      email,
      password,
    });
  };
  return (
    <div className="grid grid-cols-2">
      <AuthBanner />
      <div>
        <div className="px-20 flex flex-col justify-center h-screen">
          <div className="flex items-center justify-between mb-5">
            <img className="w-12" src="/images/logo.png" alt="logo" />
            <span className="text-xs underline">
              <Link to="/">Back to Home</Link>
            </span>
          </div>
          {resetInfo ? (
            <form onSubmit={submitHandler}>
              <h3 className="font-semibold text-2xl my-5">Forgot Password ?</h3>
              <span className="text-content mb-3 block text-sm">
                Enter your email to reset your password.
              </span>
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
                  id="email"
                  value={email}
                  disabled={isVerify}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                />
              </div>
              {error?.email && (
                <div className="mb-3 text-xs text-red-400">
                  <span>{error?.email}</span>
                </div>
              )}
              {isVerify && (
                <>
                  <div className="mb-4">
                    <label
                      className="text-content text-sm font-medium block mb-2"
                      htmlFor="verifyCode"
                    >
                      Enter Verify Code
                    </label>
                    <input
                      className="block w-full border rounded-lg py-2 px-4 text-sm outline-none"
                      type="number"
                      id="verifyCode"
                      value={verifyCode}
                      onChange={(e) => setVerifyCode(e.target.value)}
                      placeholder="Enter Your Verify Code"
                    />
                  </div>
                  <div>
                    {error?.verifyCode && (
                      <div className="mb-3 text-xs text-red-400">
                        <span>{error?.verifyCode}</span>
                      </div>
                    )}
                  </div>
                </>
              )}
              <div>
                <Button type="submit-hover" width="w-full">
                  Reset Password
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={passwordSubmitHandler}>
              <h3 className="font-semibold text-2xl my-5">
                Create a New Password
              </h3>
              <span className="text-content mb-3 block text-sm">
                Enter your new password.
              </span>
              <div className="mb-4">
                <label
                  className="text-content text-sm font-medium block mb-2"
                  htmlFor="password"
                >
                  Enter New Password
                </label>
                <input
                  className="block w-full border rounded-lg py-2 px-4 text-sm outline-none"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Your new password"
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
                  htmlFor="cpassword"
                >
                  Enter Confirm Password
                </label>
                <input
                  className="block w-full border rounded-lg py-2 px-4 text-sm outline-none"
                  type="password"
                  id="cpassword"
                  value={cpassword}
                  onChange={(e) => setCpassword(e.target.value)}
                  placeholder="Enter Confirm Password"
                />
              </div>
              <div>
                {error?.cpassword && (
                  <div className="mb-3 text-xs text-red-400">
                    <span>{error?.cpassword}</span>
                  </div>
                )}
              </div>
              <div>
                <Button type="submit-hover" width="w-full">
                  Reset Password
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
