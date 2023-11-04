import React from "react";
import { Link } from "react-router-dom";
import { useGetAllAssignmentsQuery } from "../../features/assignment/assignmentApi";

const AssignmentsList = () => {
  const { data: assignments, isLoading, isError } = useGetAllAssignmentsQuery();

  // decide what to render
  let content;

  if (isLoading) content = <span>Loading..,</span>;

  if (!isLoading && isError) content = <span>Server Error Occurred!!</span>;

  if (!isLoading && !isError && assignments?.length === 0)
    content = <span>No Assignment Found!! Create a New Assignment.</span>;

  if (!isLoading && !isError && assignments?.length > 0)
    content = assignments?.map((assignment) => {
      console.log("assignment", assignment);
      const { _id, name, course, submitAssignments, deadline } =
        assignment || {};
      const { title } = course || {};
      return (
        <tr key={_id} className="border-b hover:bg-[#F1F5F9]">
          <td className="text-sm py-4 px-4 border-r">
            <Link
              className="text-[#7950F2]"
              to={`/dashboard/assignments/${_id}`}
            >
              {name}
            </Link>
          </td>
          <td className="text-sm py-4 px-4 border-r">
            <Link to="#">{title}</Link>
          </td>
          <td className="text-sm py-4 px-4 border-r text-[#2AAA5A]">
            {submitAssignments?.length}
          </td>
          <td className="text-sm py-4 px-4 text-[#F87777]">{deadline}</td>
        </tr>
      );
    });
  return (
    <div className="p-5 mt-12 bg-white border rounded-lg w-full">
      <table class="table-auto w-full border">
        <thead className="bg-white border text-left box-border">
          <tr>
            <th className="text-sm py-2 px-4 border-r">Assignment</th>
            <th className="text-sm py-2 px-4 border-r">Course</th>
            <th className="text-sm py-2 px-4 border-r">Participants</th>
            <th className="text-sm py-2 px-4">Deadline</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>
    </div>
  );
};

export default AssignmentsList;
