import React from "react";
import { useParams } from "react-router-dom";
import { useGetCourseQuery } from "../features/course/courseApi";

const CourseDetails = () => {
  const { id } = useParams();
  const { data: course, isLoading, isError } = useGetCourseQuery(id);

  // decide what to render
  let content;

  if (isLoading) content = <div>Loading...</div>;

  if (!isLoading && isError) content = <div>Server Error Occurred!!</div>;

  if (!isLoading && !isError && !course)
    content = <div>Course Details not Found!!</div>;

  if (!isLoading && !isError && course?._id) {
    const { title, category } = course || {};

    content = (
      <>
        <div style={{ backgroundImage: "url(/images/inner-banner.jpg)" }}>
          <div className="bg-gray-900/80">
            <div className="container">
              <div className="py-6">
                <div className="w-4/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div>
                        <img
                          className="w-9 rounded-full"
                          src="/images/user.jpg"
                          alt="user"
                        />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-xs leading-none">
                          Md Maruf
                        </h4>
                        <span className="text-white text-xs">
                          UX/UI Designer
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <img
                        className="w-3"
                        src="/images/icons/star.png"
                        alt="star"
                      />
                      <img
                        className="w-3"
                        src="/images/icons/star.png"
                        alt="star"
                      />
                      <img
                        className="w-3"
                        src="/images/icons/star.png"
                        alt="star"
                      />
                      <img
                        className="w-3"
                        src="/images/icons/star.png"
                        alt="star"
                      />
                      <img
                        className="w-3"
                        src="/images/icons/star-null.png"
                        alt="star"
                      />
                      <span className="text-yellow-500 text-xs">4.5</span>
                      <span className="text-white text-xs">(15)</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-white text-xs py-1 px-3 bg-[#eaa545] rounded-full hover:bg-[#E19B36]">
                      {category.toUpperCase()}
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-white font-semibold text-2xl mb-3 mt-4">
                    {title}
                  </h2>
                  <p className="text-white text-xs">
                    Learn Web Development by building 25 websites and mobile
                    apps using HTML, CSS, Javascript, PHP, Python, MySQL & more!
                  </p>
                  <ul className="flex items-center gap-3 mt-5">
                    <li className="flex items-center gap-2 text-white text-xs">
                      <img
                        className="w-4"
                        src="/images/icons/lesson.png"
                        alt="book"
                      />
                      <span>12+ Lesson</span>
                    </li>
                    <li className="flex items-center gap-2 text-white text-xs">
                      <img
                        className="w-4"
                        src="/images/icons/time.png"
                        alt="time"
                      />
                      <span>9hr 30min</span>
                    </li>
                    <li className="flex items-center gap-2 text-white text-xs">
                      <img
                        className="w-4"
                        src="/images/icons/group.png"
                        alt="students"
                      />
                      <span>32 students enrolled</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <div className="container">
            <div>
              <div className="bg-white p-5 rounded-xl border">
                <h4 className="font-bold text-content-secondary">Overview</h4>
                {/* {Editor.} */}
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </>
    );
  }

  return <div className="pt-20 pb-20 bg-primary-bg">{content}</div>;
};

export default CourseDetails;
