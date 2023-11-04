import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileLayout from "../components/Layout/ProfileLayout";
import { useGetCoursesQuery } from "../features/course/courseApi";

const AllCourses = () => {
  const [search, setSearch] = useState("");
  const { user } = useSelector((state) => state.auth) || {};
  const { role } = user || {};
  const { data: courses, isLoading, isError } = useGetCoursesQuery();

  // decide what to render
  let content = "";

  if (!isLoading && !isError && courses.length === 0) {
    content = <span>Courses Not Found! Create New Course</span>;
  }

  if (!isLoading && !isError && courses.length > 0) {
    content = courses
      .filter((c) =>
        c.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
      .map((course, idx) => {
        const { _id, title, coverImage, students } = course || {};
        return (
          <tr key={_id} className={courses.length !== idx + 1 && "border-b"}>
            <td>
              <div
                className={`flex items-center gap-5 ${
                  courses.length === idx + 1 ? "pt-5" : "py-5"
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
            {role === "User" || role === "student" ? (
              <>
                <td>
                  <Link to={`/courses/checkout/${_id}`}>
                    <span className="inline-block py-1 px-6 bg-[#159F46] text-white text-xs rounded">
                      Enroll
                    </span>
                  </Link>
                </td>
              </>
            ) : (
              <>
                <td>
                  <span className="text-sm">{students?.length}</span>
                </td>
                <td>
                  <span className="inline-block py-1 px-6 bg-[#159F46] text-white text-xs rounded">
                    Live
                  </span>
                </td>
              </>
            )}
          </tr>
        );
      });
  }

  return (
    <ProfileLayout
      title="Courses"
      description="Manage your courses and its update like live, draft and insight."
    >
      <div className="p-5 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex items-center justify-between border rounded-lg p-1 gap-2">
          <FiSearch className="text-primary text-sm" />
          <input
            className="outline-none text-sm"
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select className="outline-none py-2 px-2 border rounded-lg text-sm w-36">
          <option>Choose</option>
          <option value="react">React</option>
          <option value="angular">Angular</option>
          <option value="vue">Vue</option>
        </select>
      </div>
      <div className="p-5">
        <table class="table-auto w-full">
          <thead className="bg-[#F0F0F0] text-left">
            <tr>
              <th className="text-sm">COURSES</th>
              {(role === "User" || role === "student") && (
                <th className="text-sm">ACTION</th>
              )}

              {role === "admin" && (
                <>
                  <th className="text-sm">STUDENTS</th>
                  <th className="text-sm">STATUS</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    </ProfileLayout>
  );
};

export default AllCourses;
