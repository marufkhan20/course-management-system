import React from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

const FeaturedCourseItem = ({ course }) => {
  const { _id, coverImage, title } = course || {};
  //   const {  } = creator || {};
  return (
    <div className="bg-white rounded-lg p-4">
      <div>
        <img
          className="rounded-lg mb-4 w-full h-52"
          src={`${process.env.REACT_APP_API_BASE_URL}${coverImage}`}
          alt="course"
        />
      </div>
      <div>
        <div className="flex items-center justify-between gap-6">
          <div className="flex gap-2">
            <img
              className="w-10 h-10 rounded-full"
              src="/images/user.jpg"
              alt="user"
            />
            <div>
              <h3 className="font-semibold leading-4 transition-all hover:text-primary cursor-pointer">
                Md Maruf
              </h3>
              <span className="text-content text-xs">Instructor</span>
            </div>
          </div>
          <div>
            <img
              className="w-4 cursor-pointer"
              src="/images/icons/love.png"
              alt="love"
            />
          </div>
        </div>
        <h3 className="mt-3 font-medium">
          <Link to="#">{title}</Link>
        </h3>
        <div className="flex items-center justify-between gap-5 mt-3 pb-3 border-b">
          <div className="flex items-center gap-2">
            <img className="w-3" src="/images/icons/lesson.png" alt="lesson" />
            <span className="text-content text-sm">12+ Lesson</span>
          </div>
          <div className="flex items-center gap-2">
            <img className="w-3" src="/images/icons/time.png" alt="time" />
            <span className="text-content text-sm">9hr 30min</span>
          </div>
        </div>
        <div className="flex items-center gap-1 mt-4">
          <img className="w-3" src="/images/icons/star.png" alt="start" />
          <img className="w-3" src="/images/icons/star.png" alt="start" />
          <img className="w-3" src="/images/icons/star.png" alt="start" />
          <img className="w-3" src="/images/icons/star.png" alt="start" />
          <img
            className="w-3"
            src="/images/icons/star-null.png"
            alt="start null"
          />
          <span className="text-sm text-[#FFC107]">4.0</span>
          <span className="font-medium text-sm text-content cursor-pointer">
            (15)
          </span>
        </div>
        <div className="mt-3">
          <Button>
            <Link to={`/courses/checkout/${_id}`}>BUY NOW</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCourseItem;
