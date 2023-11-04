import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  useGetPendingCertificatesQuery,
  useUpdateCertificateStatusMutation,
} from "../../features/certificate/certificateApi";

const PendingCertificateList = () => {
  const {
    data: certificates,
    isLoading,
    isError,
  } = useGetPendingCertificatesQuery();

  // udpate certificate status
  const [udpateCertificateStatus, { data: updatedCertificate }] =
    useUpdateCertificateStatusMutation();

  useEffect(() => {
    if (updatedCertificate?._id) {
      console.log(updatedCertificate);
    }
  }, [updatedCertificate]);

  const updateStatus = (id, status) => {
    udpateCertificateStatus({
      id,
      data: {
        status,
      },
    });
  };

  // decide what to render
  let content;

  if (isLoading) content = <span>Loading...</span>;

  if (!isLoading && isError) content = <span>Server Error Occurred!!</span>;

  if (!isLoading && !isError && certificates?.length === 0)
    content = <span>No Requested Certificate Found!!</span>;

  if (!isLoading && !isError && certificates?.length > 0)
    content = certificates?.map((certificate) => {
      const { courseId, studentName, _id } = certificate || {};
      const { title } = courseId || {};
      return (
        <tr className="border-b hover:bg-[#F1F5F9]" key={_id}>
          <td className="text-sm py-4 px-4 border-r">
            <Link
              className="transition-all hover:text-content-secondary"
              to="#"
            >
              {studentName}
            </Link>
          </td>
          <td className="text-sm py-4 px-4 border-r">
            <Link
              className="transition-all hover:text-content-secondary"
              to="#"
            >
              {title}
            </Link>
          </td>
          <td className="text-sm py-4 px-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateStatus(_id, "APPROVE")}
                className="py-2 px-3 rounded bg-green-700 text-white transition-all hover:bg-green-900"
              >
                APPROVE
              </button>
              <button
                onClick={() => updateStatus(_id, "REJECT")}
                className="py-2 px-3 rounded bg-red-700 text-white transition-all hover:bg-red-900"
              >
                REJECT
              </button>
            </div>
          </td>
        </tr>
      );
    });
  return (
    <div className="p-5 mt-12 bg-white border rounded-lg w-full">
      <table class="table-auto w-full border">
        <thead className="bg-white border text-left box-border">
          <tr>
            <th className="text-sm py-2 px-4 border-r">Student Name</th>
            <th className="text-sm py-2 px-4 border-r">Course Name</th>
            <th className="text-sm py-2 px-4 border">Action</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>
    </div>
  );
};

export default PendingCertificateList;
