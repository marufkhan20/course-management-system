import React, { useEffect, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { Link, useLocation } from "react-router-dom";
import ProfileLayout from "../components/Layout/ProfileLayout";
import Sidebar from "../components/Sidebar";
import Assignments from "../components/StudentDashboard/Assignments";
import DetailsCard from "../components/StudentDashboard/DetailsCard";

const StudentDashboard = () => {
  const [creditAlert, setCreditAlert] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location?.state === "/checkout") {
      setCreditAlert(true);
    }
  }, [location]);
  return (
    <ProfileLayout notDefault>
      <div className="flex items-start sm:flex-row flex-col gap-8">
        <Sidebar />
        <div className="md:w-4/5 sm:w-3/5 w-full">
          {creditAlert && (
            <div className="py-2 px-4 border rounded-lg mb-2 bg-[#DCFCE7] flex justify-between items-center">
              <div>
                <span className="text-[#166534] mr-5">
                  You Earn New Credit Points
                </span>
                <Link
                  className="text-primary underline text-sm"
                  to="/dashboard/credit-referral"
                >
                  See All Credit Points
                </Link>
              </div>
              <div>
                <TiDeleteOutline
                  onClick={() => setCreditAlert(false)}
                  className="text-lg text-primary cursor-pointer"
                />
              </div>
            </div>
          )}
          <div className="grid grid-cols-3 gap-5">
            <DetailsCard title="Completed the module" total="14" isLeft="3" />
            <DetailsCard
              title="Completed the module on time"
              total="10"
              isLeft="2"
            />
            <DetailsCard title="Finished the lesson" total="50" isLeft="0" />
          </div>
          <Assignments />
        </div>
      </div>
    </ProfileLayout>
  );
};

export default StudentDashboard;
