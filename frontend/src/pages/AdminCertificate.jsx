import React, { useState } from "react";
import PendingCertificateList from "../components/Certificate/PendingCertificateList";
import UploadCertificate from "../components/Certificate/UploadCertificate";
import ProfileLayout from "../components/Layout/ProfileLayout";
import Sidebar from "../components/Sidebar";

const AdminCertificate = () => {
  const [state, setState] = useState("requested");
  return (
    <ProfileLayout notDefault>
      <div className="flex items-start sm:flex-row flex-col gap-8">
        <Sidebar />
        <div className="md:w-4/5 sm:w-3/5 w-full">
          <div className="p-5 border-b bg-white rounded-lg border">
            <h3 className="font-semibold text-lg mb-3">Assignments</h3>
            <p className="text-content text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              mollitia, molestiae quas vel sint commodi repudiandae consequuntur
              voluptatum laborum
            </p>
            <div className="flex items-center gap-3 mt-5">
              <button
                className={`py-3 px-4 border hover:bg-[#F1F5F9] ${
                  state === "requested" && "bg-[#F1F5F9]"
                }`}
                onClick={() => setState("requested")}
              >
                Requested Certificate
              </button>
              <button
                className={`py-3 px-4 border hover:bg-[#F1F5F9] ${
                  state === "upload" && "bg-[#F1F5F9]"
                }`}
                onClick={() => setState("upload")}
              >
                Upload Certificate
              </button>
            </div>
          </div>

          {state === "requested" && <PendingCertificateList />}

          {state === "upload" && <UploadCertificate setState={setState} />}
        </div>
      </div>
    </ProfileLayout>
  );
};

export default AdminCertificate;
