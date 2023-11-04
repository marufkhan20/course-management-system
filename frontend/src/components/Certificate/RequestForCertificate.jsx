import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRequestForCertificateMutation } from "../../features/certificate/certificateApi";
import { useGetEnrollCoursesByStudentIdQuery } from "../../features/course/courseApi";
import Button from "../ui/Button";

const RequestForCertificate = ({ setState }) => {
  const { user } = useSelector((state) => state.auth) || {};
  const { userid: userId, profile } = user || {};
  const { firstName, lastName } = profile || {};
  const [error, setError] = useState();
  const [courseId, setCourseId] = useState();
  const { data: courses } = useGetEnrollCoursesByStudentIdQuery(userId);

  // request for certificate
  const [requestForCertificate, { data: certificate, error: serverError }] =
    useRequestForCertificateMutation();

  useEffect(() => {
    if (serverError) {
      setError(serverError?.data?.error);
    }

    if (certificate?._id) {
      setError("");
      setState("all");
    }
  }, [certificate, serverError, setState]);

  // decide what to render
  let content;

  if (courses?.length === 0)
    content = <option value="">No Course Found</option>;

  if (courses?.length > 0)
    content = courses?.map((course) => {
      const { courseId } = course || {};
      const { _id, title } = courseId || {};
      return (
        <option key={_id} value={_id}>
          {title}
        </option>
      );
    });

  // submit handler
  const submitHandler = (e) => {
    e.preventDefault();

    if (!courseId) {
      return setError("Please Select Ccourse!!");
    }

    requestForCertificate({
      courseId,
      studentName: `${firstName} ${lastName}`,
    });
  };
  return (
    <div className="bg-white p-5 rounded-lg border mt-12 w-full">
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label
            className="text-content text-sm font-medium block mb-2"
            htmlFor="course"
          >
            Select Course
          </label>
          <select
            className="block w-full border rounded-lg py-2 px-4 text-sm outline-none"
            id="course"
            onChange={(e) => setCourseId(e.target.value)}
          >
            <option value="">Select Course</option>
            {content}
          </select>
        </div>
        {error && (
          <div className="mb-3 text-xs text-red-400">
            <span>{error}</span>
          </div>
        )}
        <div>
          <Button type="submit-hover">Request For Certificate</Button>
        </div>
      </form>
    </div>
  );
};

export default RequestForCertificate;
