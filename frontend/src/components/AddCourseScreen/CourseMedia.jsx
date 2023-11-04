import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMedia } from "../../features/course/courseSlice";

const CourseMedia = ({ onStage, setOnStage }) => {
  const [coverImage, setCoverImage] = useState("");
  const [video, setVideo] = useState("");
  const [error, setError] = useState({});
  const dispatch = useDispatch();

  const captureImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setCoverImage(reader.result);
    };
  };

  const checkValidation = () => {
    const validationError = {};

    // validation
    if (!coverImage) {
      validationError.coverImage = "Cover Image is Required!!";
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
      addMedia({
        coverImage,
        video,
      })
    );

    setOnStage((prevState) => prevState + 1);
  };
  return (
    <div>
      <div className="py-6 px-8 border-b">
        <h2 className="font-semibold text-lg text-primary">Courses Media</h2>
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-y-5">
          <div>
            <label className="block mb-2 text-content text-sm" htmlFor="cover">
              Course cover image
            </label>
            <input
              className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
              type="file"
              id="cover"
              onChange={captureImage}
            />
          </div>
          {error?.coverImage && (
            <div className="text-xs text-red-400">
              <span>{error?.coverImage}</span>
            </div>
          )}
          {coverImage ? (
            <div className="flex items-center justify-center bg-[#EDEDE8] min-h-60 rounded-lg">
              <img
                className="w-4/5 h-4/5"
                src={coverImage}
                alt="course cover"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center bg-[#EDEDE8] h-60 rounded-lg">
              <img
                className="w-44 opacity-50"
                src="/images/course_cover.png"
                alt="course cover"
              />
            </div>
          )}
          <div>
            <input
              className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
              type="url"
              placeholder="Video URL"
              value={video}
              onChange={(e) => setVideo(e.target.value)}
            />
          </div>
          {video ? (
            <iframe
              width="full"
              height="360"
              src={video}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullscreen
            ></iframe>
          ) : (
            <div className="flex items-center justify-center bg-[#EDEDE8] h-60 rounded-lg">
              <img
                className="w-8 cursor-pointer"
                src="/images/play-icon.png"
                alt="play icon"
              />
            </div>
          )}
        </form>
      </div>
      {onStage !== 4 && (
        <div className="p-8 flex-wrap gap-2 flex items-center justify-between">
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
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseMedia;
