import React from "react";
import FeaturedStudentItem from "../components/FeaturedStudents/FeaturedStudentItem";
import { useGetTopStudentsQuery } from "../features/student/studentApi";

const FeaturedStudents = () => {
  const { data: students } = useGetTopStudentsQuery();
  return (
    <div className="pt-36 pb-20 bg-primary-bg px-4 sm:px-0">
      <div className="container">
        <h2 className="mx-auto text-center font-semibold text-2xl">
          Featured Students
        </h2>
        <div className="grid grid-cols-2 gap-10 mt-10">
          {students
            ?.filter((item) => item.assignmentNumber > 0)
            .map((student) => (
              <FeaturedStudentItem student={student} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedStudents;
