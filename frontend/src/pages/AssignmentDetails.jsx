import parse from "html-react-parser";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SubmitAssignment from "../components/Assignments/SubmitAssignment";
import ProfileLayout from "../components/Layout/ProfileLayout";
import Button from "../components/ui/Button";
import {
  useGetAssingmentQuery,
  useGetSubmitAssignmentQuery,
} from "../features/assignment/assignmentApi";

const AssignmentDetails = () => {
  const { user } = useSelector((state) => state.auth) || {};
  const { userid: studentId, role } = user || {};
  const { assignmentId } = useParams();
  const [modal, setModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const {
    data: assignment,
    isLoading,
    isError,
  } = useGetAssingmentQuery(assignmentId);

  // get submit assignment
  const { data: submitAssignment } = useGetSubmitAssignmentQuery({
    assignmentId: assignment?._id,
    studentId,
  });

  const navigate = useNavigate();

  // control modal
  const controlModal = () => {
    setModal(!modal);
  };

  // decide what to render
  let content;

  if (isLoading) content = <span>Loading...</span>;

  if (!isLoading && isError) content = <span>Server Error Occurred!!</span>;

  if (!isLoading && !isError && assignment?.notFound) {
    alert("You Can't Access this Assignment!");
    navigate("/dashboard");
  }

  if (!isLoading && !isError && assignment?._id) {
    const { name, hints, brief } = assignment || {};

    content = (
      <div className="p-5">
        <div className="flex items-center justify-between border-b pb-4">
          <h3 className="font-semibold text-xl">{name}</h3>
          {submitted === assignment?._id && <Button>Pending</Button>}
          {role !== "admin" && submitAssignment?._id ? (
            submitAssignment?.number === 0 ? (
              <Button>Pending</Button>
            ) : (
              submitAssignment?.number > 0 && (
                <Button type="hover">{submitAssignment?.number}</Button>
              )
            )
          ) : (
            !submitAssignment?._id &&
            submitted !== assignment?._id && (
              <Button onClick={controlModal} type="hover">
                Submit
              </Button>
            )
          )}
        </div>

        {submitAssignment?.instructorOpinion && (
          <div className="mt-2">
            <h3 className="font-semibold mb-2 border py-2 px-3 rounded bg-[#F1F5F9]">
              Instructor Opinion
            </h3>
            <div className="mb-6">
              {parse(submitAssignment?.instructorOpinion)}
            </div>
          </div>
        )}

        {hints && (
          <div className="mt-2">
            <h3 className="font-semibold mb-2 border py-2 px-3 rounded bg-[#F1F5F9]">
              Assingment Hints/Resource
            </h3>
            <p className="mb-6">{hints}</p>
          </div>
        )}
        <div className="mt-2">
          <h3 className="font-semibold mb-2 border py-2 px-3 rounded bg-[#F1F5F9]">
            Assignment Brief
          </h3>
          <div>{parse(brief)}</div>
        </div>
      </div>
    );
  }
  return (
    <ProfileLayout
      title="Assignment Details"
      description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, iusto."
    >
      {content}
      <SubmitAssignment
        assignmentId={assignment?._id}
        control={controlModal}
        modal={modal}
        submitted={setSubmitted}
      />
    </ProfileLayout>
  );
};

export default AssignmentDetails;
