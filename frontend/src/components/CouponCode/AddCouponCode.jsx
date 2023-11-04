import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAddCouponMutation } from "../../features/coupon/couponApi";
import { useGetCoursesQuery } from "../../features/course/courseApi";
import Button from "../ui/Button";

const AddCouponCode = ({ setState }) => {
  const [name, setName] = useState();
  const [perchantage, setPerchantage] = useState();
  const [couponCode, setCouponCode] = useState("");
  const [course, setCourse] = useState();
  const [error, setError] = useState({});

  // get all courses
  const { data: courses, isLoading, isError } = useGetCoursesQuery();

  // add new coupon
  const [addCoupon, { data: newCoupon }] = useAddCouponMutation();

  // decide what to render
  let content;

  if (isLoading) content = <option>Loading...</option>;

  if (!isLoading && isError) content = <option>Server Error Occurred!!</option>;

  if (!isLoading && !isError && courses?.length === 0)
    content = <option value="ksjfdsf0255fd">No Coupon Found!!</option>;

  if (!isLoading && !isError && courses?.length > 0)
    content = courses?.map((course) => (
      <option key={course._id} value={course._id}>
        {course.title}
      </option>
    ));

  // when new coupon added
  useEffect(() => {
    if (newCoupon?._id) {
      toast.success("New Coupon Created Successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setError({});
      setState("show");
    }
  }, [newCoupon, setState]);

  // check validation
  const checkValidation = () => {
    const validationError = {};

    if (!name) {
      validationError.name = "Coupon Name is Required!!";
    }

    if (!course) {
      validationError.course = "Please Select Course!!";
    }

    if (!couponCode) {
      validationError.couponCode = "Coupon Code is Required!!";
    }

    if (!perchantage) {
      validationError.perchantage = "Coupon Discount Perchantage is Required!!";
    }

    return validationError;
  };

  // submit handler
  const submitHandler = (e) => {
    e.preventDefault();

    // validation
    const validationError = checkValidation();

    if (Object.keys(validationError).length > 0) {
      return setError(validationError);
    }

    addCoupon({
      name,
      course,
      code: couponCode,
      discount: perchantage,
    });
  };
  return (
    <div className="mt-12 p-5 border bg-white rounded-lg">
      <form onSubmit={submitHandler}>
        <div className="mb-5">
          <div>
            <label
              className="font-semibold block mb-2 text-content text-sm"
              htmlFor="name"
            >
              Coupon Name
            </label>
            <input
              className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
              type="text"
              id="name"
              placeholder="Enter your coupon name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {error?.name && (
            <div className="mt-3 text-xs text-red-400">
              <span>{error?.name}</span>
            </div>
          )}
        </div>
        <div className="mb-5">
          <div>
            <label
              className="font-semibold block mb-2 text-content text-sm"
              htmlFor="course"
            >
              Select Course
            </label>
            <select
              id="course"
              className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
              onChange={(e) => setCourse(e.target.value)}
            >
              <option>Select Course</option>
              <option value="all">All Course</option>
              {content}
            </select>
          </div>
          {error?.course && (
            <div className="mt-3 text-xs text-red-400">
              <span>{error?.course}</span>
            </div>
          )}
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          <div>
            <div>
              <label
                className="font-semibold block mb-2 text-content text-sm"
                htmlFor="code"
              >
                Coupon Code
              </label>
              <input
                className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                type="text"
                id="code"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
            </div>
            {error?.couponCode && (
              <div className="mt-3 text-xs text-red-400">
                <span>{error?.couponCode}</span>
              </div>
            )}
          </div>
          <div>
            <div>
              <label
                className="font-semibold block mb-2 text-content text-sm"
                htmlFor="discount"
              >
                Discount Perchantage
              </label>
              <input
                className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                type="number"
                id="discount"
                placeholder="Enter your coupon discount perchantage"
                value={perchantage}
                onChange={(e) => setPerchantage(e.target.value)}
              />
            </div>
            {error?.perchantage && (
              <div className="mt-3 text-xs text-red-400">
                <span>{error?.perchantage}</span>
              </div>
            )}
          </div>
        </div>
        <div className="mt-5">
          <Button type="submit-hover">Create Coupon Code</Button>
        </div>
      </form>
    </div>
  );
};

export default AddCouponCode;
