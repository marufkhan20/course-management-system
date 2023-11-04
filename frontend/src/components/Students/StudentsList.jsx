import React from "react";
import { useGetEnrollStudentsQuery } from "../../features/course/courseApi";
import Student from "./Student";

const StudentsList = () => {
  const { data: students, isLoading, isError } = useGetEnrollStudentsQuery();

  const studentProfileIds = [];

  // decide what to render
  let content;

  if (isLoading) content = <span>Loading...</span>;

  if (!isLoading && isError) content = <span>Server Error Occurred!!</span>;

  if (!isLoading && !isError && students?.length === 0)
    content = <span>No Student Found!!</span>;

  if (!isLoading && !isError && students?.length > 0)
    // eslint-disable-next-line array-callback-return
    content = students?.map((student) => {
      if (!studentProfileIds.includes(student?.profileId?._id)) {
        studentProfileIds.push(student?.profileId?._id);
        return <Student key={student?._id} student={student} />;
      }
    });
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">{content}</div>
  );
};

export default StudentsList;
