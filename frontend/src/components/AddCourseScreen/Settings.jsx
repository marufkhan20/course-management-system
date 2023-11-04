import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TagsInput } from "react-tag-input-component";
import { useAddCoureMutation } from "../../features/course/courseApi";
import { addSettings } from "../../features/course/courseSlice";

const Settings = ({ onStage, setOnStage }) => {
  const [requirements, setRequirements] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState({});
  const dispatch = useDispatch();

  const [addCourse, { data, isLoading, isError, error: responseError }] =
    useAddCoureMutation();
  const { title, category, level, description, coverImage, video } =
    useSelector((state) => state.course);

  useEffect(() => {
    if (!isLoading && isError) {
      console.log(responseError);
      setError(responseError);
    }

    if (!isLoading && !isError && data?.course?._id) {
      setOnStage((prevState) => prevState + 1);
    }
  }, [data, isLoading, isError, responseError, setOnStage]);

  const checkValidation = () => {
    const validationError = {};

    // validation
    if (requirements.length === 0) {
      validationError.requirements = "Requirements is Required!!";
    }

    if (!price) {
      validationError.price = "Price is Required!!";
    }

    return validationError;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();

    // form validation
    const validationError = checkValidation();

    if (Object.keys(validationError).length > 0) {
      return setError(validationError);
    }

    dispatch(
      addSettings({
        requirements,
        price,
      })
    );

    addCourse({
      title,
      category,
      level,
      description,
      coverImage,
      video,
      price,
      requirements,
    });
  };
  return (
    <div>
      <div className="py-6 px-8 border-b">
        <h2 className="font-semibold text-lg text-primary">Requirements</h2>
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-y-5">
          <div>
            <TagsInput
              value={requirements}
              onChange={setRequirements}
              name="requirements"
              placeHolder="Enter Requirements"
            />
          </div>
          {error?.requirements && (
            <div className="text-xs text-red-400">
              <span>{error?.requirements}</span>
            </div>
          )}
          <div>
            <label className="block mb-2 text-content text-sm" htmlFor="price">
              Price
            </label>
            <input
              className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
              type="text"
              id="price"
              placeholder="10.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          {error?.price && (
            <div className="text-xs text-red-400">
              <span>{error?.price}</span>
            </div>
          )}
        </form>
      </div>
      {onStage !== 4 && (
        <div className="p-8 flex flex-wrap gap-2 items-center justify-between">
          <button
            className={`block py-2 px-12 border border-transparent rounded text-sm font-medium hover:text-black hover:bg-transparent transition-all bg-black text-white hover:border-black`}
            disabled={onStage === 1}
            onClick={() => setOnStage((prevState) => prevState - 1)}
          >
            Back
          </button>
          <button
            className={`block py-2 px-12 border border-transparent rounded text-sm font-medium hover:text-[#1d9cfd] hover:bg-transparent transition-all bg-[#1d9cfd] text-white hover:border-[#1d9cfd]`}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default Settings;
