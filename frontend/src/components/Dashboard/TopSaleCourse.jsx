import React from "react";
import { Link } from "react-router-dom";
import { useGetTopSaleCoursesQuery } from "../../features/course/courseApi";

const TopSaleCourse = () => {
  const {
    data: topSaleCourses,
    isLoading,
    isError,
  } = useGetTopSaleCoursesQuery();

  // decide what to render
  let content;

  if (isLoading) content = <span>Loading...</span>;

  if (!isLoading && isError) content = <span>Server Error Occurred!!</span>;

  if (!isLoading && !isError && topSaleCourses?.length === 0)
    content = <span>No Course Found!!</span>;

  if (!isLoading && !isError && topSaleCourses?.length > 0)
    content = topSaleCourses?.map((course, idx) => {
      const { _id, coverImage, title, sales, price } = course || {};

      return (
        <tr
          key={_id}
          className={topSaleCourses.length !== idx + 1 && "border-b"}
        >
          <td>
            <div
              className={`flex items-center gap-5 ${
                topSaleCourses.length === idx + 1 ? "pt-5" : "py-5"
              }`}
            >
              <div>
                <img
                  src={`${process.env.REACT_APP_API_BASE_URL}${coverImage}`}
                  alt="course"
                  className="h-24 rounded-lg"
                />
              </div>
              <div>
                <span className="text-sm mb-2 block">
                  <Link
                    className="font-medium hover hover:text-primary transition-all"
                    to={`/courses/${_id}`}
                  >
                    {title}
                  </Link>
                </span>
                <div className="flex items-center justify-between gap-5">
                  <span className="flex items-center gap-3">
                    <img
                      className="w-3"
                      src="/images/icons/lesson.png"
                      alt="lesson"
                    />
                    <span className="text-sm">10+ Lessons</span>
                  </span>
                  <span className="flex items-center gap-3">
                    <img
                      className="w-3"
                      src="/images/icons/time.png"
                      alt="time"
                    />
                    <span className="text-sm">7hr 20min</span>
                  </span>
                </div>
              </div>
            </div>
          </td>
          <td>
            <span className="text-xs ">{sales}</span>
          </td>
          <td>
            <span className="inline-block text-xs">${sales * price}</span>
          </td>
        </tr>
      );
    });

  return (
    <div className="mt-5 bg-white border rounded-lg">
      <div className="p-5 border-b">
        <h3 className="text-xl text-content-secondary font-semibold">
          Best Selling Courses
        </h3>
      </div>
      <div className="p-5">
        <table class="table-auto w-full">
          <thead className="bg-[#F0F0F0] text-left">
            <tr>
              <th className="text-sm">COURSES</th>
              <th className="text-sm">SALES</th>
              <th className="text-sm">AMOUNT</th>
            </tr>
          </thead>
          <tbody> {content} </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopSaleCourse;
