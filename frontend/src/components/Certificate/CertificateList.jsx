import Axios from "axios";
import FileDownload from "js-file-download";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetCertificatesByStudentIdQuery } from "../../features/certificate/certificateApi";

const CertificateList = () => {
  const { user } = useSelector((state) => state.auth) || {};
  const { userid: studentId } = user || {};
  const {
    data: certificates,
    isLoading,
    isError,
  } = useGetCertificatesByStudentIdQuery(studentId);

  // download course certificate
  const download = (id) => {
    Axios({
      url: `${process.env.REACT_APP_API_BASE_URL}/api/certificate/download-certificate/${id}`,
      method: "GET",
      responseType: "blob",
    }).then((res) => {
      FileDownload(res.data, "certificate.png");
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
      const { courseId, status, _id } = certificate || {};
      const { _id: id, title } = courseId || {};
      return (
        <tr className="border-b hover:bg-[#F1F5F9]" key={_id}>
          <td className="text-sm py-4 px-4 border-r">
            <Link
              className="transition-all hover:text-content-secondary"
              to="#"
            >
              {title}
            </Link>
          </td>
          <td className="text-sm py-4 px-4 border-r">{status}</td>
          <td className="text-sm py-4 px-4">
            {status === "APPROVE" ? (
              <button
                onClick={() => download(id)}
                className="py-2 px-3 rounded bg-green-900 text-white transition-all hover:bg-green-700"
              >
                Download
              </button>
            ) : status === "PENDING" ? (
              <span>Waiting for admin approve!</span>
            ) : (
              <span>
                Admin reject your request! <br /> Complete your course and then
                request again!
              </span>
            )}
          </td>
        </tr>
      );
    });
  return (
    <div className="p-5 mt-12 bg-white border rounded-lg w-full">
      <table class="table-auto w-full border">
        <thead className="bg-white border text-left box-border">
          <tr>
            <th className="text-sm py-2 px-4 border-r">Course Name</th>
            <th className="text-sm py-2 px-4 border-r">Status</th>
            <th className="text-sm py-2 px-4 border">Download</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>
    </div>
  );
};

export default CertificateList;
