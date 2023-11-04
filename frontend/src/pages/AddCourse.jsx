import React, { useState } from "react";
import { Link } from "react-router-dom";
import CourseMedia from "../components/AddCourseScreen/CourseMedia";
import Information from "../components/AddCourseScreen/Information";
import Settings from "../components/AddCourseScreen/Settings";
import Success from "../components/AddCourseScreen/Success";
import AddCourseProgress from "../components/ui/AddCourseProgress";

const screen = {
  1: Information,
  2: CourseMedia,
  3: Settings,
  4: Success,
};

const AddCourse = () => {
  const [onStage, setOnStage] = useState(1);
  const Layout = screen[onStage];
  return (
    <div className="pt-36 pb-20 bg-primary-bg px-4 sm:px-0">
      <div className="container">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-3xl">Add New Course</h3>
          <div>
            <button
              type="submit"
              className={`block py-2 px-6 border border-transparent rounded text-sm font-medium hover:text-black hover:bg-transparent transition-all bg-black text-white hover:border-black`}
            >
              <Link to="/profile/all-courses">Back to Course</Link>
            </button>
          </div>
        </div>
        <div className="border mt-12 rounded-lg bg-white">
          <AddCourseProgress onStage={onStage} />
          <Layout onStage={onStage} setOnStage={setOnStage} />
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
