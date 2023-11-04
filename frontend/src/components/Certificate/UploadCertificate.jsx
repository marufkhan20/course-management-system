import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetCoursesQuery,
  useUploadCourseCertificateMutation,
} from "../../features/course/courseApi";
import Button from "../ui/Button";

const UploadCertificate = ({ setState }) => {
  const [error, setError] = useState({});
  const [courseId, setCourseId] = useState();
  const [certificateImage, setCertificateImage] = useState();
  const { data: courses } = useGetCoursesQuery();

  // request for certificate
  const [uploadCourseCertificate, { data: course, error: serverError }] =
    useUploadCourseCertificateMutation();

  useEffect(() => {
    if (serverError) {
      setError({ certificate: serverError?.data?.error });
    }

    if (course?._id) {
      console.log(course);
      setError("");
      setCourseId("");
      setCertificateImage("");
      toast.success("Certificate Upload Successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [course, serverError, setState]);

  // decide what to render
  let content;

  if (courses?.length === 0)
    content = <option value="">No Course Found</option>;

  if (courses?.length > 0)
    content = courses?.map((course) => {
      const { _id, title } = course || {};
      return (
        <option key={_id} value={_id}>
          {title}
        </option>
      );
    });

  // capture image
  const captureImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setCertificateImage(reader.result);
    };
  };

  // submit handler
  const submitHandler = (e) => {
    e.preventDefault();

    // validation check
    const validationError = {};

    if (!courseId) {
      validationError.course = "Please Select Course!!";
    }

    if (!certificateImage) {
      validationError.certificate = "Please Upload Certificate Image!!";
    }

    if (Object.keys(validationError)?.length > 0) {
      return setError(validationError);
    }

    uploadCourseCertificate({
      id: courseId,
      data: {
        certificate: certificateImage,
      },
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
        {error?.course && (
          <div className="mb-3 text-xs text-red-400">
            <span>{error?.course}</span>
          </div>
        )}
        <div className="mb-4">
          <label
            className="text-content text-sm font-medium block mb-2"
            htmlFor="certificate"
          >
            Select Certificate
          </label>
          <input
            className="block w-full border rounded-lg py-2 px-4 text-sm outline-none"
            type="file"
            id="certificate"
            onChange={captureImage}
          />
        </div>
        {error?.certificate && (
          <div className="mb-3 text-xs text-red-400">
            <span>{error?.certificate}</span>
          </div>
        )}
        <div>
          <Button type="submit-hover">Upload Certificate</Button>
        </div>
      </form>
    </div>
  );
};

export default UploadCertificate;
