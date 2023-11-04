import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProfileLayout from "../components/Layout/ProfileLayout";
import Button from "../components/ui/Button";
import { useChangePasswordMutation } from "../features/auth/authApi";

const Security = () => {
  const { user } = useSelector((state) => state.auth) || {};
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [changePassword, { data, isLoading, isError, error: responseError }] =
    useChangePasswordMutation();

  useEffect(() => {
    if (!isLoading && isError) {
      setError(responseError?.data?.error);
    }

    if (!isLoading && !isError && data?._id) {
      toast.success("Change Password Successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setCurrentPassword("");
      setPassword("");
      setConfirmPassword("");
      setError("");
    }
  }, [data, isLoading, isError, responseError]);

  // check validation
  const checkValidation = () => {
    const validationError = {};

    if (!currentPassword) {
      validationError.currentPassword = "Current Password is Required!!";
    }

    if (!password) {
      validationError.password = "Password is Required!!";
    }

    if (!confirmPassword) {
      validationError.confirmPassword = "Confirm is Required!!";
    }

    if (password !== confirmPassword) {
      validationError.confirmPassword =
        "Password and Confirm Password is not Math!!";
    }

    return validationError;
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // validation check
    const validationError = checkValidation();
    if (Object.keys(validationError).length > 0) {
      return setError(validationError);
    }

    changePassword({
      data: {
        password,
        currentPassword,
      },
      userId: user?.userid,
    });
  };
  return (
    <ProfileLayout
      title="Security"
      description="Edit your account settings and change your password here."
    >
      <div className="p-5">
        <h5 className="font-semibold mb-1">Change Password</h5>
        <span className="text-content text-xs">
          We will email you a confirmation when changing your password, so
          please expect that email after submitting.
        </span>
        <div className="mt-3">
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
              <div>
                <div>
                  <label
                    className="font-semibold block mb-1 text-content text-sm"
                    htmlFor="currentPassword"
                  >
                    Current Password
                  </label>
                  <input
                    className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                    type="text"
                    id="currentPassword"
                    placeholder="Enter your first name"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                {error?.currentPassword && (
                  <div className="mt-3 text-xs text-red-400">
                    <span>{error?.currentPassword}</span>
                  </div>
                )}
              </div>
              <div>
                <div>
                  <label
                    className="font-semibold block mb-1 text-content text-sm"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                    type="text"
                    id="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error?.password && (
                  <div className="mt-3 text-xs text-red-400">
                    <span>{error?.password}</span>
                  </div>
                )}
              </div>
              <div>
                <div>
                  <label
                    className="font-semibold block mb-1 text-content text-sm"
                    htmlFor="confirmPassword"
                  >
                    Confirm New Password
                  </label>
                  <input
                    className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                    type="text"
                    id="confirmPassword"
                    placeholder="Enter confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                {error?.confirmPassword && (
                  <div className="mt-3 text-xs text-red-400">
                    <span>{error?.confirmPassword}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-5">
              <Button type="submit-hover">Change Password</Button>
            </div>
          </form>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default Security;
