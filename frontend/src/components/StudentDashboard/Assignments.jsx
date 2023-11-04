import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetAssignmentsByStudentIdQuery } from "../../features/assignment/assignmentApi";

const Assignments = () => {
  const { user } = useSelector((state) => state.auth) || {};
  const { userid: userId } = user || {};

  const {
    data: assignments,
    isLoading,
    isError,
  } = useGetAssignmentsByStudentIdQuery(userId);

  // decide what to render
  let content;

  if (isLoading) content = <span>Loading...</span>;

  if (!isLoading && isError) content = <span>Server Error Occurred!!</span>;

  if (!isLoading && !isError && assignments?.length === 0)
    content = <span>No Assignment Found!!</span>;

  if (!isLoading && !isError && assignments?.length > 0)
    content = assignments?.map((assignment) => {
      const { _id, name, number, deadline, submitAssignments } =
        assignment || {};
      let dateNow = Date.now();
      dateNow = moment(dateNow).format("YYYY-MM-DD");

      // select submitted assignment
      const has = submitAssignments?.filter((s) => s.studentId === userId);

      const submitDate =
        has[0]?.submitDate &&
        moment(Number(has[0]?.submitDate)).format("YYYY-MM-DD");

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
            {has.length > 0 &&
            has[0].assignmentId === _id &&
            has[0]?.number === 0
              ? "Pending"
              : has[0]?.number}{" "}
            - / {number}
          </td>
          <td
            className={`text-sm py-4 px-4 border-r text-center ${
              submitDate > deadline ? "text-[#F87777]" : "text-[#2AAA5A]"
            }`}
          >
            {submitDate ? submitDate : "---"}
          </td>
          <td
            className={`text-sm py-4 px-4 ${
              dateNow > deadline ? "text-[#F87777]" : "text-[#2AAA5A]"
            }`}
          >
            {deadline}
          </td>
        </tr>
      );
    });
  return (
    <div className="p-5 mt-12 bg-white border rounded-lg w-full">
      <table class="table-auto w-full border">
        <thead className="bg-white border text-left box-border">
          <tr>
            <th className="text-sm py-2 px-4 border-r">Assignment</th>
            <th className="text-sm py-2 px-4 border-r">Number</th>
            <th className="text-sm py-2 px-4 border-r">Submit Time</th>
            <th className="text-sm py-2 px-4">Deadline</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>
    </div>
  );
};

export default Assignments;
