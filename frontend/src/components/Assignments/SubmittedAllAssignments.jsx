import moment from "moment";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetAllAssignmentsQuery,
  useGetAssingmentQuery,
} from "../../features/assignment/assignmentApi";
import MarkAssignmentNumber from "./MarkAssignmentNumber";
import ViewSubmitAssignment from "./ViewSubmitAssignment";

const SubmittedAllAssignments = () => {
  const [assignmentId, setAssignmentId] = useState();
  const [check, setCheck] = useState(false);
  const [modal, setModal] = useState(false);
  const [assignModal, setAssignModal] = useState(false);
  const [modalId, setModalId] = useState();
  const [assignModalId, setAssignModalId] = useState();

  // toggle modal
  const controlModal = (id) => {
    setModal(!modal);
    setModalId(id && id);
  };

  const assignModalControl = (id) => {
    setAssignModal(!assignModal)
    setAssignModalId(id && id);
  }

  // get all assignments
  const { data: assignments, isLoading, isError } = useGetAllAssignmentsQuery();

  // show all assignments in a ui
  let assignmentContent;

  if (isLoading) assignmentContent = <span>Loading...</span>;

  if (!isLoading && isError)
    assignmentContent = <span>Server Error Occurred!!</span>;

  if (!isLoading && !isError && assignments?.length === 0)
    assignmentContent = <option value="">No Assignment Found!!</option>;

  if (!isLoading && !isError && assignments?.length > 0)
    assignmentContent = assignments?.map((assignment) => {
      const { _id, name } = assignment || {};
      return (
        <option key={_id} value={_id}>
          {name}
        </option>
      );
    });

  // Get Single Assingment by Assingment ID
  const {
    data: assignment,
    isLoading: assingmentLoading,
    isError: assingmentError,
  } = useGetAssingmentQuery(assignmentId, {
    skip: !check,
  });

  // decide what to render
  let content;

  if (assingmentLoading) content = <span>Loading...</span>;

  if (!assingmentLoading && assingmentError)
    content = <span>Server Error Occurred!!</span>;

  if (
    !assingmentLoading &&
    !assingmentError &&
    assignments?.submitAssignments?.length === 0
  )
    content = <span>No Submitted Assignment Found!!</span>;

  if (!isLoading && !isError && assignment?.submitAssignments?.length > 0)
    content = assignment?.submitAssignments?.map((submitAssignment) => {
      const { deadline, number: assignmentNumber } = assignment || {};

      const {
        _id,
        submitDate: date,
        number,
        studentId,
        githubUrl,
        hostedUrl,
      } = submitAssignment || {};

      // get current date for check deadline
      let dateNow = Date.now();
      dateNow = moment(dateNow).format("YYYY-MM-DD");

      const submitDate = moment(Number(date)).format("YYYY-MM-DD");

      return (
        <>
          <tr key={_id} className="border-b hover:bg-[#F1F5F9]">
            <td className="text-sm py-4 px-4 border-r">
              <Link
                className="text-[#7950F2]"
                to={`/dashboard/students/${studentId}`}
              >
                #{studentId}
              </Link>
            </td>
            <td className="text-sm py-4 px-4 border-r">
              {number === 0 ? "Pending" : number} / {assignmentNumber}
            </td>
            <td
              className={`text-sm py-4 px-4 border-r ${
                submitDate > deadline ? "text-[#F87777]" : "text-[#2AAA5A]"
              }`}
            >
              {submitDate}
            </td>
            <td
              className={`text-sm py-4 px-4 border-r ${
                dateNow > deadline ? "text-[#F87777]" : "text-[#2AAA5A]"
              }`}
            >
              {deadline}
            </td>
            <td>
              <div className="flex items-center justify-center gap-2">
                <button
                  className="py-1 px-2 rounded bg-green-800 text-white text-xs"
                  onClick={() => controlModal(_id)}
                >
                  View
                </button>
                <button onClick={() => assignModalControl(_id)} className="py-1 px-2 rounded bg-blue-800 text-white text-xs">
                  Mark
                </button>
              </div>
            </td>
          </tr>
          {modalId === _id && (
            <ViewSubmitAssignment
              githubUrl={githubUrl}
              hostedUrl={hostedUrl}
              modal={modal}
              control={controlModal}
            />
          )}

          {assignModalId === _id && (
            <MarkAssignmentNumber
              number={number}
              assignmentId={_id}
              modal={assignModal}
              control={assignModalControl}
            />
          )}
        </>
      );
    });

  // handl eassignment change
  const handleAssignmentChange = (id) => {
    setAssignmentId(id);
    setCheck(true);
  };
  return (
    <>
      <div className="p-5 mt-12 bg-white border rounded-lg w-full">
        <div>
          <label
            className="font-semibold block mb-1 text-content text-sm"
            htmlFor="assignment"
          >
            Select Assignment
          </label>
          <select
            className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
            name="assignment"
            id="assignment"
            onChange={(e) => handleAssignmentChange(e.target.value)}
          >
            <option value="">Select Assignment</option>
            {assignmentContent}
          </select>
        </div>
      </div>
      <div className="p-5 mt-12 bg-white border rounded-lg w-full">
        <table class="table-auto w-full border">
          <thead className="bg-white border text-left box-border">
            <tr>
              <th className="text-sm py-2 px-4 border-r">Student</th>
              <th className="text-sm py-2 px-4 border-r">Number</th>
              <th className="text-sm py-2 px-4 border-r">Submit Time</th>
              <th className="text-sm py-2 px-4 border-r">Deadline</th>
              <th className="text-sm py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    </>
  );
};

export default SubmittedAllAssignments;
