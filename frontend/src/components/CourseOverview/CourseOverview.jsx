import React from "react";
import CourseOverviewItem from "./CourseOverviewItem";

const CourseOverview = () => {
  return (
    <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2">
      <CourseOverviewItem />
      <CourseOverviewItem />
      <CourseOverviewItem />
      <CourseOverviewItem />
      <CourseOverviewItem />
      <CourseOverviewItem />
      <CourseOverviewItem />
      <CourseOverviewItem />
      <CourseOverviewItem />
    </div>
  );
};

export default CourseOverview;
