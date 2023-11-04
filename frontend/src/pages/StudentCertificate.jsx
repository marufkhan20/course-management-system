import React, { useState } from "react";
import CertificateList from "../components/Certificate/CertificateList";
import RequestForCertificate from "../components/Certificate/RequestForCertificate";
import ProfileLayout from "../components/Layout/ProfileLayout";
import Sidebar from "../components/Sidebar";

const StudentCertificate = () => {
  const [state, setState] = useState("all");
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
                  state === "all" && "bg-[#F1F5F9]"
                }`}
                onClick={() => setState("all")}
              >
                All Certificate
              </button>
              <button
                className={`py-3 px-4 border hover:bg-[#F1F5F9] ${
                  state === "request" && "bg-[#F1F5F9]"
                }`}
                onClick={() => setState("request")}
              >
                Request For Certificate
              </button>
            </div>
          </div>

          {state === "all" && <CertificateList />}

          {state === "request" && <RequestForCertificate setState={setState} />}
        </div>
      </div>
    </ProfileLayout>
  );
};

export default StudentCertificate;
