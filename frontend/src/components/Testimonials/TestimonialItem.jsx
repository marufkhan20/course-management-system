import parse from "html-react-parser";
import React from "react";

const TestimonialItem = ({ item }) => {
  const { review, profile, profession } = item || {};
  console.log("item", item);
  const { firstName, lastName, profileImage } = profile || {};
  return (
    <div className="bg-gradient-to-r from-gray-600 to-gray-200 rounded-xl text-center py-10">
      <p className="text-white w-3/4 mx-auto font-medium mb-12">
        {parse(review)}
      </p>
      <div className="text-center">
        <img
          className="w-20 h-20 rounded-full mx-auto"
          src={
            profileImage
              ? `${process.env.REACT_APP_API_BASE_URL}${profileImage}`
              : "/images/user.jpg"
          }
          alt="user"
        />
        <h3 className="font-semibold text-gray-900 text-xl mt-5">
          {`${firstName} ${lastName}`}
        </h3>
        <span className="text-gray-900 ">{profession || "STUDENT"}</span>
      </div>
    </div>
  );
};

export default TestimonialItem;
