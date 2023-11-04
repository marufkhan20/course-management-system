import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ProcessPayment from "../components/ProcessPayment/ProcessPayment";
import Button from "../components/ui/Button";
import { useApplyCouponCodeMutation } from "../features/coupon/couponApi";
import {
  useEnrollCourseMutation,
  useGetCourseQuery,
} from "../features/course/courseApi";

const Checkout = () => {
  const navigate = useNavigate();

  // get profile
  const { user } = useSelector((state) => state.auth);
  const { profile } = user || {};

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [couponCode, setCouponCode] = useState();
  const [couponError, setCouponError] = useState();
  const [redeemPoints, setRedeemPoints] = useState(false);

  const { id } = useParams();

  // set profile data
  useEffect(() => {
    setFirstName(profile?.firstName);
    setLastName(profile?.lastName);
    setNumber(profile?.number);
    setAddress1(profile?.address1);
    setAddress2(profile?.address2);
    setCity(profile?.city);
    setCountry(profile?.country);
    setZipCode(profile?.zipCode);
  }, [profile]);

  // get course
  const { data: course } = useGetCourseQuery(id) || {};
  const { title, price, requirements, level } = course || {};
  const [coursePrice, setCoursePrice] = useState();

  useEffect(() => {
    if (price) {
      setCoursePrice(price);
    }
  }, [price]);

  // enroll course
  const [
    enrollCourse,
    {
      data: enrollCourseData,
      isLoading: enrollCourseLoading,
      isError: enrollCourseError,
      error: enrollCourseServerError,
    },
  ] = useEnrollCourseMutation();

  useEffect(() => {
    if (!enrollCourseLoading && enrollCourseError) {
      console.log(enrollCourseServerError);
    }

    if (!enrollCourseLoading && !enrollCourseError && enrollCourseData) {
      navigate("/dashboard", { state: "/checkout" });
    }
  }, [
    enrollCourseData,
    enrollCourseLoading,
    enrollCourseError,
    enrollCourseServerError,
    navigate,
  ]);

  // apply coupon handler
  const [applyCouponCode, { data: couponData, error: couponResError }] =
    useApplyCouponCodeMutation();

  const applyCouponHandler = () => {
    if (!couponCode) {
      return setCouponError("Coupon Code is Required!!");
    }

    if (!couponData?._id) {
      applyCouponCode({
        courseId: id,
        couponCode,
      });
    }
  };

  useEffect(() => {
    if (couponResError) {
      setCouponError(couponResError?.data?.error);
    }

    if (couponData?._id) {
      let { discount } = couponData || {};
      discount = 100 - discount;
      const price = coursePrice * ("." + discount);
      setCoursePrice(price);
      setCouponError("");

      toast.success("Coupon Code Apply Successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [couponData, couponResError]);

  // apply redeem points
  const applyRedeemPoints = () => {
    if (!redeemPoints) {
      setCoursePrice(Number(price) - Number(profile?.redeemPoints));

      setRedeemPoints(true);
      toast.success("Redeem Points Use Successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // handle payment
  const handlePaymentSuccess = ({ id: stripeToken, type }) => {
    if (id && type) {
      if (id) {
        enrollCourse({
          courseId: id,
          stripeToken,
          paymentMethod: type,
          price: coursePrice,
          totalPrice: price,
          useRedeem: redeemPoints,
        });
      }
    }
  };

  return (
    <div className="pt-36 bg-primary-bg min-h-screen px-4 sm:px-0 pb-20">
      <div className="container">
        <div className="flex sm:flex-row  flex-col-reverse justify-between gap-10">
          <div className="w-full sm:w-9/12">
            <div className="border rounded-lg bg-white">
              <div className="border-b p-4">
                <h5 className="font-medium">Billing Address</h5>
              </div>
              <form className="p-4">
                <div className="flex justify-between gap-5 mb-4">
                  <div className="w-full">
                    <div>
                      <label
                        className="font-semibold block mb-2 text-content text-sm"
                        htmlFor="firstName"
                      >
                        First Name
                      </label>
                      <input
                        className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                        type="text"
                        id="firstName"
                        placeholder="Enter your first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <div>
                      <label
                        className="font-semibold block mb-2 text-content text-sm"
                        htmlFor="lastName"
                      >
                        Last Name
                      </label>
                      <input
                        className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                        type="text"
                        id="lastName"
                        placeholder="Enter your last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full mb-4">
                  <div>
                    <label
                      className="font-semibold block mb-1 text-content text-sm"
                      htmlFor="number"
                    >
                      Phone Number
                    </label>
                    <input
                      className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                      type="number"
                      id="number"
                      placeholder="Phone Number"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full mb-4">
                  <div>
                    <label
                      className="font-semibold block mb-2 text-content text-sm"
                      htmlFor="address1"
                    >
                      Address Line 1
                    </label>
                    <input
                      className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                      type="text"
                      id="address1"
                      placeholder="Address"
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full mb-4">
                  <div>
                    <label
                      className="font-semibold block mb-2 text-content text-sm"
                      htmlFor="address2"
                    >
                      Address Line 2 (Optional)
                    </label>
                    <input
                      className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                      type="text"
                      id="address2"
                      placeholder="Address"
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-between gap-5 mb-4">
                  <div className="w-full">
                    <div>
                      <label
                        className="font-semibold block mb-2 text-content text-sm"
                        htmlFor="city"
                      >
                        City
                      </label>
                      <input
                        className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                        type="text"
                        id="city"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <div>
                      <label
                        className="font-semibold block mb-2 text-content text-sm"
                        htmlFor="country"
                      >
                        Country
                      </label>
                      <input
                        className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                        type="text"
                        id="country"
                        placeholder="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <div>
                      <label
                        className="font-semibold block mb-2 text-content text-sm"
                        htmlFor="zipCode"
                      >
                        Zip/Postal Code
                      </label>
                      <input
                        className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                        type="text"
                        id="zipCode"
                        placeholder="Zip/Postal Code"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="border rounded-lg bg-white mt-5 flex items-center justify-between gap-10">
              <div className="p-4 w-full">
                <label
                  className="font-semibold block mb-2 text-content text-sm"
                  htmlFor="coupon"
                >
                  Coupon Code
                </label>
                <div className="flex items-center gap-5 w-full">
                  <div className="w-full">
                    <div>
                      <input
                        className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                        type="text"
                        id="coupon"
                        placeholder="Enter your coupon code for discount"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    {couponData?._id ? (
                      <Button
                        type="disable"
                        width="py-1 mx-auto"
                        title="You Coupon Already Use."
                      >
                        Apply
                      </Button>
                    ) : (
                      <Button
                        onClick={applyCouponHandler}
                        width="py-1"
                        type="submit-hover"
                      >
                        Apply
                      </Button>
                    )}
                  </div>
                </div>
                {couponError && (
                  <div>
                    <span className="text-sm inline-block text-red-600 mt-2">
                      {couponError}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4 w-full">
                <label
                  className="font-semibold block mb-2 text-content text-sm"
                  htmlFor="redeem"
                >
                  Redeem Points
                </label>
                <div className="flex items-center gap-5">
                  <div className="w-full">
                    <div>
                      <input
                        className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                        type="text"
                        id="redeem"
                        placeholder="Enter your coupon code for discount"
                        value={profile?.redeemPoints || "00"}
                      />
                    </div>
                  </div>
                  <div>
                    {redeemPoints || !profile?.redeemPoints ? (
                      <Button
                        type="disable"
                        width="py-1 mx-auto"
                        title="You Redeem Points Already Use."
                      >
                        Use
                      </Button>
                    ) : (
                      <Button
                        onClick={applyRedeemPoints}
                        width="py-1"
                        type="submit-hover"
                      >
                        Use
                      </Button>
                    )}
                  </div>
                </div>
                {couponError && (
                  <div>
                    <span className="text-sm inline-block text-red-600 mt-2">
                      {couponError}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-5 border bg-white rounded-lg p-5">
              <ProcessPayment handlePayment={handlePaymentSuccess} />
            </div>
          </div>
          <div className="w-full sm:w-3/12 p-4 border rounded-lg bg-white">
            <div className="bg-[#392C7D] py-3 text-center">
              <h3 className="text-white text-lg">Course Details</h3>
            </div>
            <span className="mt-4 block text-sm text-content">{title}</span>
            <h2 className="text-2xl text-content-secondary font-bold my-3">
              <span className="text-sm">$</span>
              {coursePrice}
            </h2>
            <h4 className="font-bold mb-4">Requirements</h4>
            <ul className="flex flex-col gap-3 mb-4">
              {requirements?.map((item) => (
                <li className="list-disc text-xs text-content ml-4" key={item}>
                  {item}
                </li>
              ))}
            </ul>
            <h4 className="font-bold mb-2">Level</h4>
            <span className="text-sm text-content">{level}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
