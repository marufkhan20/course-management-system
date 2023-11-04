import React from "react";

const CourseOverviewItem = () => {
  return (
    <div className="flex items-center gap-6 p-6 border rounded-2xl transition-all hover:-mt-3 hover:mb-3">
      <img src="/images/icons/icon-book.svg" alt="book" />
      <span className="font-medium text-content text-sm">
        8X higher engagement in live online classes by industry professionals.
      </span>
    </div>
  );
};

export default CourseOverviewItem;
